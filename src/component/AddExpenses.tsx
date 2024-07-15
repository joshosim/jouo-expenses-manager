import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import supabase from "../config/supabaseClient";

const AddExpenses = () => {
  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(false);

    if (!title || !amount) {
      setFormError(true);
      return;
    }

    const { data, error } = await supabase
      .from("expenses")
      .insert([{ title, amount }]);
    if (error) {
      console.log(error);
      setFormError(true);
    }
    if (data) {
      setFormError(false);
    }
  };

  return (
    <Box p={2}>
      <Typography mb={2} textAlign="center" fontWeight={600} fontSize={20}>
        AddExpenses
      </Typography>
      <form action="" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
          label="What for"
          type="text"
          placeholder="what for"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
          label="Amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        {/* <Box height="250px" /> */}
        <Button
          variant="contained"
          sx={{ p: "12px 24px" }}
          fullWidth
          type="submit"
        >
          Add
        </Button>
      </form>
      {formError && (
        <Typography
          color="red"
          border="1px solid red"
          borderRadius="12px"
          p="12px"
          my={2}
          textAlign="center"
        >
          Please fill all fields
        </Typography>
      )}
    </Box>
  );
};

export default AddExpenses;
