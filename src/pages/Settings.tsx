import React from "react";
import AppLayout from "../Layout/AppLayout";
import { Check, ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <Box display="flex" alignItems="center" gap="8px">
        <ChevronLeft
          onClick={() => navigate("/profile")}
          sx={{ cursor: "pointer" }}
        />
        <Typography fontWeight={600}>Settings</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        sx={{ cursor: "pointer" }}
        mt={2}
      >
        <Typography>Light Mode</Typography>
        <Check />
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        sx={{ cursor: "pointer" }}
      >
        <Typography>Dark Mode</Typography>
      </Box>
      <Divider />
    </AppLayout>
  );
};

export default Settings;
