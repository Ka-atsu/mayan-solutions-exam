import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Make sure both required environment variables exist before continuing
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables.");
}

// Initialize and export the Supabase client using the secure service role key
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
