import { Backdrop, Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Done } from "@mui/icons-material";
import supabase from "../config/superbase";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpenses } from "../services/expenses";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  amount: yup.string().required("Amount is required"),
});

const AddExpenses = ({ onClose }: { onClose: (open: boolean) => void }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await addExpenses({ ...data, uuid: currentUser.id });
    },
    onSuccess: (data) => {
      console.log(data, "data gotten");
      toast.success("Successfully Added!");
      queryClient.invalidateQueries({ queryKey: ["EXPENSES"] });
      onClose(false);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(`Error: ${error}`);
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Box p={2}>
      <Typography mb={2} textAlign="center" fontWeight={600} fontSize={20}>
        AddExpenses
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
              label="What for"
              type="text"
              placeholder="what for"
              error={!!errors?.title}
              helperText={errors?.title ? errors?.title.message : ""}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
              label="Amount"
              type="number"
              placeholder="Amount"
              error={!!errors?.amount}
              helperText={errors?.amount ? errors?.amount.message : ""}
            />
          )}
        />

        <Button
          variant="contained"
          sx={{ p: "12px 24px" }}
          fullWidth
          type="submit"
          disabled={!!mutation.isPending}
        >
          {mutation.isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default AddExpenses;
