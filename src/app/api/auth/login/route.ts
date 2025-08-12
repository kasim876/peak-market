import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../..";
import z from "zod";

const FormSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

async function getUser(email: string) {
  const { data, error } = await db.from("users").select("*").eq("email", email).single();
  if (error) throw error;
  return data;
}

async function signIn(formData: FormData) {
  if (!JWT_SECRET) throw new Error("Секретный ключ не определён");

  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (validatedFields.error) throw validatedFields.error;
  const { email, password } = validatedFields.data;

  const user = await getUser(email);
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) throw new Error("Неправильный пароль");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    },
    token,
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await signIn(formData);

    return Response.json(result, {
      status: 200,
      headers: {
        "Set-Cookie": `token=${result.token}; Path=/; HttpOnly; SameSite=Strict`,
      },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
