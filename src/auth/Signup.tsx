import { Facebook, Google, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import bgImg from "../assets/expenses.jpg";
// import supabase from "../config/supabaseClient";
import React, { useState } from "react";

const Signup = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fullName, setFullName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   const { data, error } = await supabase.auth.signUp({
    //     email: email,
    //     password: password,
    //     options: {
    //       data: {
    //         full_name: fullName,
    //       },
    //     },
    //   });

    //   alert("Check you email for verification link");
    // } catch (error) {
    //   alert(error);
    // }
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
      <form style={{ padding: "24px" }} onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Full Name"
          fullWidth
          sx={{ mb: "12px", borderRadius: "12px" }}
          variant="outlined"
          //onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          type="email"
          label="Email"
          fullWidth
          sx={{ mb: "12px", borderRadius: "12px" }}
          variant="outlined"
          //onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          //onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: <RemoveRedEye />,
          }}
          sx={{ mb: "12px", borderRadius: "12px" }}
          variant="outlined"
        />
        <Typography fontSize={12} textAlign="right" sx={{ mb: "12px" }}>
          Forgot Password ?
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadiud: "8px",
            fontSize: 14,
            fontWeight: 400,
            p: "12px",
            mb: "12px",
          }}
          type="submit"
        >
          Signup
        </Button>

        <Typography fontSize={14} textAlign="center" sx={{ mb: "12px" }}>
          or sign up with
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="12px"
          sx={{ mb: "12px" }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              color: "#000333",
              border: "1px solid green",
              p: "8px",
            }}
            fullWidth
            startIcon={<Google />}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              color: "#000333",
              border: "1px solid green",
              p: "8px",
            }}
            fullWidth
            startIcon={<Facebook />}
          >
            Facebook
          </Button>
        </Box>
        <Typography fontSize={12} textAlign="center">
          Already have an account?{" "}
          <Link style={{ textDecoration: "underline" }} to="/login">
            Login
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Signup;
