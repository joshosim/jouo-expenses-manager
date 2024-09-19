import supabase from "../config/superbase";

export const addExpenses = async ({ title, amount }: any) => {
  const { error } = await supabase.from("expenses").insert({ title, amount });
  if (error) {
    throw new Error(error.message);
  }
};

export const getExpenses = async () => {
  const { data, error } = await supabase.from("expenses").select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
