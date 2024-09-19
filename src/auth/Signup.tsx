import { Facebook, Google, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/expenses.jpg";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import supabase from "../config/superbase";
import toast from "react-hot-toast";

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

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    toast.success("Account Registered!");
    if (data?.session?.access_token) {
      localStorage.setItem("token", data?.session?.access_token);
      navigate("/");
    }
    console.log(data);
  };

  const { data: theData } = supabase.auth.onAuthStateChange(
    (event, session) => {
      console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    }
  );

  // call unsubscribe to remove the callback
  theData.subscription.unsubscribe();

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
