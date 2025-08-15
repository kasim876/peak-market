import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUser(db: SupabaseClient<Database>, email: string) {
  const { data: user, error } = await db.from("users").select("*").eq("email", email).single();
  if (!user) throw new Error("Пользователя с таким e-mail не существует.");
  return user;
}
