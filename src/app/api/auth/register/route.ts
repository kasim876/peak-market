import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../..";
import z from "zod";

const FormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
});

const JWT_EXPIRES_IN = "1h";

async function signUp(formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });
  if (validatedFields.error) throw validatedFields.error;
  const { email, name, password, phone, surname } = validatedFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const { data: user, error } = await db
    .from("users")
    .insert({
      name,
      surname,
      email,
      password_hash: hashPassword,
      phone,
    })
    .select(`*`)
    .single();

  if (error) throw error;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      avatar_url: user.avatar_url,
    },
    token,
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await signUp(formData);

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
