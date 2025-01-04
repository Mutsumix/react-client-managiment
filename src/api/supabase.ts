import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);  // URLを確認（本番環境では削除してください）

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
