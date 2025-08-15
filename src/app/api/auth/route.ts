import { getUser } from "@/lib/getUser";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "..";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(null, {
        status: 200,
      });
    }

    try {
      const { id, email } = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
      };

      const user = await getUser(db, email);

      return Response.json(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
          avatar_url: user.avatar_url,
        },
        { status: 200 },
      );
    } catch (verifyError) {
      return Response.json(null, { status: 200 });
    }
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
