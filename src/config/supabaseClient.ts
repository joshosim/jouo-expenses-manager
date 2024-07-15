import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yqaejivgyixspliwyzgo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxYWVqaXZneWl4c3BsaXd5emdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NzIzMTEsImV4cCI6MjAzNjM0ODMxMX0.hfyvSOetV5qZ7W7ZsiO2rHQeg03Yg66gmMmj7c29UTg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
