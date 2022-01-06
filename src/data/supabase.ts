import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_supabaseUrl as string;
const supabaseAnonKey = import.meta.env.VITE_supabaseAnonKey as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
