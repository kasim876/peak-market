import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = NextResponse.json(null);
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
