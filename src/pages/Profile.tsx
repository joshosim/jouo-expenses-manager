import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { ChevronLeft, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import supabase from "../config/superbase";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../services/expenses";

const Profile = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuthContext();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.clear();
    toast.success("Logged Out!");
    navigate("/login");
  };

  const query = useQuery({
    queryKey: ["PROFILE", currentUser.id],
    queryFn: () => getProfileData(currentUser.id),
  });

  console.log("profileInfo", query.data);

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

        {query.data?.map((nh: any) => {
          if (nh.id === currentUser.id) {
            return (
              <Box key={nh.id}>
                <Stack display="grid" sx={{ placeItems: "center" }}>
                  <Stack position="relative">
                    <Avatar
                      sx={{ height: "150px", width: "150px", fontSize: "75px" }}
                    >
                      {nh.firstname.slice(0, 1) || ""}
                    </Avatar>
                  </Stack>
                </Stack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  my={2}
                  gap={2}
                >
                  <Typography textAlign="center" fontWeight={600}>
                    {nh.firstname || ""} {nh.lastname || ""}
                  </Typography>
                  <Edit
                    onClick={() => navigate("/change-profile")}
                    sx={{ cursor: "pointer" }}
                  />
                </Box>
                <Typography textAlign="center" my={1} fontWeight={600}>
                  {`${nh.age} years old` || ""}
                </Typography>
                <Typography textAlign="center" my={1} fontWeight={600}>
                  {nh.phone || ""}
                </Typography>
                <Typography textAlign="center">{currentUser.email}</Typography>
              </Box>
            );
          }
        })}

        <Box mx={2}>
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
          <Paper
            sx={{
              border: "1px solid #ece4e7",
              p: 1.5,
              my: 1,
              cursor: "pointer",
              fontFamily: "Sora",
            }}
            onClick={() => navigate("#")}
          >
            Privacy Policy
          </Paper>
          <Paper
            sx={{
              border: "1px solid #ece4e7",
              p: 1.5,
              my: 1,
              cursor: "pointer",
              fontFamily: "Sora",
            }}
            onClick={() => navigate("#")}
          >
            Report a Problem
          </Paper>
        </Box>
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
