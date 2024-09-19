import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import supabase from "../config/superbase";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuthContext();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <AppLayout>
      <Box>
        <Box display="flex" alignItems="center" gap="8px">
          <ChevronLeft
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          />
          <Typography fontWeight={600}>Profile</Typography>
        </Box>
        <Box display="grid" sx={{ placeItems: "center" }}>
          <Avatar sx={{ height: "150px", width: "150px" }}></Avatar>
        </Box>
        <Typography textAlign="center" my={2} fontWeight={600}>
          Terry Gafae
        </Typography>
        <Typography textAlign="center">{currentUser.email}</Typography>

        <Paper
          sx={{
            border: "1px solid #ece4e7",
            p: 1.5,
            my: 1,
            fontFamily: "Sora",
          }}
        >
          Phone
        </Paper>
        <Paper
          sx={{
            border: "1px solid #ece4e7",
            p: 1.5,
            my: 1,
            cursor: "pointer",
            fontFamily: "Sora",
          }}
          onClick={() => navigate("/settings")}
        >
          Settings
        </Paper>
        <Button
          onClick={logout}
          variant="contained"
          sx={{
            position: "fixed",
            bottom: 70,
            left: 10,
            right: 10,
            py: "12px",
          }}
        >
          Logout
        </Button>
      </Box>
    </AppLayout>
  );
};

export default Profile;
