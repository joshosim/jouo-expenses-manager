import { Facebook, Google, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Box height="100vh">
      <Box
        height="20vh"
        bgcolor="#000"
        sx={{ p: "24px" }}
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
      <Box p="24px">
        <TextField
          type="text"
          label="Full Name"
          fullWidth
          sx={{ mb: "12px", borderRadius: "12px" }}
          variant="outlined"
        />
        <TextField
          type="email"
          label="Email"
          fullWidth
          sx={{ mb: "12px", borderRadius: "12px" }}
          variant="outlined"
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
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
      </Box>
    </Box>
  );
};

export default Signup;
