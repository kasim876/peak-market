import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../..";
import z from "zod";
import { getUser } from "@/lib/getUser";

const FormSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

const JWT_EXPIRES_IN = "1h";

async function signIn(formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (validatedFields.error) throw validatedFields.error;
  const { email, password } = validatedFields.data;

  const user = await getUser(db, email);
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) throw new Error("Неправильный пароль");

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
    const result = await signIn(formData);

    return Response.json(result.user, {
      status: 200,
      headers: {
        "Set-Cookie": `token=${result.token}; Path=/; HttpOnly; SameSite=Strict`,
      },
    });
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      {
        status: 500,
      },
    );
  }
}
