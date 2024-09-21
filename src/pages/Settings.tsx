import React from "react";
import AppLayout from "../Layout/AppLayout";
import { Check, ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const { mode, toggleTheme, applySystemSettings } = useThemeContext();
  const navigate = useNavigate();
  return (
    <AppLayout>
      <Box display="flex" alignItems="center" gap="8px" my={2}>
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
        onClick={() => toggleTheme("light")}
      >
        <Typography>Light Mode</Typography>
        {mode === "light" && <Check sx={{ color: "green" }} />}
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        sx={{ cursor: "pointer" }}
        onClick={() => toggleTheme("dark")}
      >
        <Typography>Dark Mode</Typography>
        {mode === "dark" && <Check sx={{ color: "green" }} />}
      </Box>
      <Divider />
    </AppLayout>
  );
};

export default Settings;
