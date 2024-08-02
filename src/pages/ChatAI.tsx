import { Box, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";

const ChatAI = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <Box>
        <Box display="flex" alignItems="center" gap="8px">
          <ChevronLeft
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          />
          <Typography fontWeight={600}>Ask AI</Typography>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default ChatAI;
