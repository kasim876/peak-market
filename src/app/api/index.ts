import { Database } from "@/types/database";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let db: SupabaseClient<Database>;

try {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseKey || !supabaseUrl) throw new Error("Supabase URL or KEY not defined");

  db = createClient<Database>(supabaseUrl, supabaseKey);
} catch (error) {
  throw new Error("Failed to connect to the db");
}

export default db;
