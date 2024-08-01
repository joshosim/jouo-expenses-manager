import { Facebook, Google, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/expenses.jpg";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onTogglePass = () => {
    setTogglePassword(!togglePassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setIsLoading(false);
      });
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
          type="email"
          label="Email"
          fullWidth
          sx={{ mb: "12px", borderRadius: "12px" }}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type={!togglePassword ? "password" : "text"}
          label="Password"
          fullWidth
          InputProps={{
            endAdornment: !togglePassword ? (
              <RemoveRedEye onClick={onTogglePass} sx={{ cursor: "pointer" }} />
            ) : (
              <VisibilityOffOutlinedIcon
                onClick={onTogglePass}
                sx={{ cursor: "pointer" }}
              />
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? "Signing up..." : "Signup"}
        </Button>

        {error && (
          <Typography
            fontSize={14}
            textAlign="center"
            sx={{ my: "12px", color: "red" }}
          >
            {error}
          </Typography>
        )}

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
            disabled
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
            disabled
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
