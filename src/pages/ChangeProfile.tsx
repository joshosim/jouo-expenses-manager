import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeProfile } from "../services/expenses";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  age: yup.string().required("age is required"),
  lastname: yup.string().required("lastname is required"),
  phone: yup.string().required("phone number is required"),
});

const ChangeProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await changeProfile({ ...data, id: currentUser.id });
    },
    onSuccess: (data) => {
      console.log(data, "profile saved");
      toast.success("Profile Updated!");
      queryClient.invalidateQueries({ queryKey: ["PROFILE"] });
      navigate("/profile");
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
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
              label="Firstname"
              type="text"
              placeholder="firstname"
              error={!!errors?.firstname}
              helperText={errors?.firstname ? errors?.firstname.message : ""}
            />
          )}
        />
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
              label="Lastname"
              type="text"
              placeholder="lastname"
              error={!!errors?.lastname}
              helperText={errors?.lastname ? errors?.lastname.message : ""}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
              label="Age"
              type="number"
              placeholder="Age"
              error={!!errors?.age}
              helperText={errors?.age ? errors?.age.message : ""}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
              label="Phone"
              type="number"
              placeholder="phone"
              error={!!errors?.phone}
              helperText={errors?.phone ? errors?.phone.message : ""}
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
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Box>
  );
};

export default ChangeProfile;
