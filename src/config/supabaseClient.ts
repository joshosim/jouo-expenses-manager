import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yqaejivgyixspliwyzgo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxYWVqaXZneWl4c3BsaXd5emdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NzIzMTEsImV4cCI6MjAzNjM0ODMxMX0.hfyvSOetV5qZ7W7ZsiO2rHQeg03Yg66gmMmj7c29UTg";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

// async function signUpNewUser() {
//   const { data, error } = await supabase.auth.signUp({
//     email: "example@email.com",
//     password: "example-password",
//     options: {
//       emailRedirectTo: "https://example.com/welcome",
//     },
//   });
// }

// async function signInWithEmail() {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: "example@email.com",
//     password: "example-password",
//   });
// }

// await supabase.auth.resetPasswordForEmail("hello@example.com", {
//   redirectTo: "http://example.com/account/update-password",
// });

// await supabase.auth.updateUser({ password: new_password });
