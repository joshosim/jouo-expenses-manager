import supabase from "../config/superbase";
import { useAuthContext } from "../context/AuthContext";

export const addExpenses = async ({
  title,
  amount,
  user_id,
}: {
  title: string;
  amount: number;
  user_id: string;
}) => {
  const { error } = await supabase
    .from("expenses")
    .insert({ title, amount, user_id });

  if (error) {
    throw new Error(error.message);
  }
};
export const changeProfile = async ({
  firstname,
  lastname,
  age,
  phone,
  user_id,
}: {
  firstname: string;
  lastname: string;
  age: string;
  phone: string;
  user_id: string;
}) => {
  const { error } = await supabase
    .from("profile")
    .insert({ firstname, lastname, age, phone, user_id });

  if (error) {
    throw new Error(error.message);
  }
};
export const getExpenses = async (userId: any) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("uuid", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getProfileData = async (userId: any) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
