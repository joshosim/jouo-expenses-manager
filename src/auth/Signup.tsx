import { Facebook, Google, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/expenses.jpg";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";

const schema = yup.object().shape({
  email: yup.string().email("must be an email").required("email is required"),
  password: yup.string().required("password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [togglePassword, setTogglePassword] = useState(false);

  const onTogglePass = () => {
    setTogglePassword(!togglePassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await signUp(data);
    },
    onSuccess: (data) => {
      toast.success("Account Registered!");
      if (data?.session?.access_token) {
        localStorage.setItem("token", data?.session?.access_token);
        navigate("/");
      }
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
    <Box height="100vh">
      <Box
        height="20vh"
        sx={{
          backgroundImage: "url(" + bgImg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          p: "24px",
        }}
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="flex-end"
      >
        <Typography color="#FFFFFF" fontWeight={700} fontSize={28}>
          Register
        </Typography>
        <Typography color="#FFFFFF" fontWeight={400} fontSize={12}>
          Account for your expenses today
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              fullWidth
              sx={{ mb: "12px", borderRadius: "12px" }}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={!togglePassword ? "password" : "text"}
              label="Password"
              fullWidth
              InputProps={{
                endAdornment: !togglePassword ? (
                  <RemoveRedEye
                    onClick={onTogglePass}
                    sx={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={onTogglePass}
                    sx={{ cursor: "pointer" }}
                  />
                ),
              }}
              sx={{ mb: "12px", borderRadius: "12px" }}
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />
        <Typography fontSize={12} textAlign="right" sx={{ mb: "12px" }}>
          Forgot Password ?
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            borderRadiud: "8px",
            fontSize: 14,
            fontWeight: 400,
            p: "12px",
            mb: "12px",
          }}
          disabled={!!mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
