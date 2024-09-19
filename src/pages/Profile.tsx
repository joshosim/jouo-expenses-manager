import { Box, Button, Typography } from "@mui/material";
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
        <Typography>{currentUser.email}</Typography>
        <Button onClick={logout} fullWidth variant="contained">
          Logout
        </Button>
      </Box>
    </AppLayout>
  );
};

export default Profile;
