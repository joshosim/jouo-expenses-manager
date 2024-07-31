import { Facebook, Google, RemoveRedEye } from "@mui/icons-material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/expenses.jpg";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const goTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onTogglePass = () => {
    setTogglePassword(!togglePassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setIsLoading(false);
        goTo("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Box height="100vh">
      <Box
        height="25vh"
        bgcolor="#000"
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
          Sign in to your Account
        </Typography>
        <Typography color="#FFFFFF" fontWeight={400} fontSize={12}>
          Account for your expenses today
        </Typography>
      </Box>
      <Box p="24px">
        <form action="" onSubmit={handleSubmit}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          >
            Login
          </Button>
        </form>

        <Typography fontSize={14} textAlign="center" sx={{ mb: "12px" }}>
          or login with
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
          Don't have an account?{" "}
          <Link style={{ textDecoration: "underline" }} to="/signup">
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
