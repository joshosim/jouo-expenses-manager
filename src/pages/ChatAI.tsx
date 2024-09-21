import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const formatData = (text: string) => {
  const lines = text.split("\n").filter((line) => line.trim() !== ""); // Splits by lines

  return lines.map((line, index) => {
    if (line.startsWith("**")) {
      // Render headers (bold or h5)
      return (
        <Typography key={index} variant="h6" gutterBottom>
          {line.replace(/\*\*/g, "")}
        </Typography>
      );
    } else if (line.startsWith("*")) {
      // Render bullet points
      return (
        <Typography key={index} variant="body2" gutterBottom>
          {line.replace(/\*/g, "")}
        </Typography>
      );
    } else {
      // Render normal paragraphs
      return (
        <Typography key={index} variant="body2" paragraph>
          {line}
        </Typography>
      );
    }
  });
};

const ChatAI = () => {
  const navigate = useNavigate();
  const [resp, setResp] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const StartChat = async (message: string) => {
    const key = "AIzaSyA4crOBOaVFvXXdNRXVqCBqoPFB7sLWLDo";
    //process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = message;
    setIsWaiting(true);
    const result = await model.generateContent(prompt);

    setResp(result.response.text());
    setIsWaiting(false);
  };

  return (
    <AppLayout>
      <Box display="flex" alignItems="center" gap="8px">
        <ChevronLeft onClick={() => navigate(-1)} sx={{ cursor: "pointer" }} />
        <Typography fontWeight={600}>Ask JOUO AI</Typography>
      </Box>

      {isWaiting ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Typography fontSize={12} p={2}>
          {formatData(resp)}
          {resp === "" && (
            <Typography
              display="grid"
              justifyContent="center"
              sx={{ alignItems: "center", minHeight: "50vh" }}
            >
              <Typography fontSize={12} display="flex" alignItems="center">
                <span>Ask Jouo AI about your expenses</span>
                <span className="wave">👋</span>
              </Typography>
            </Typography>
          )}
        </Typography>
      )}

      <Box
        position="fixed"
        bottom={70}
        right={10}
        left={10}
        display="grid"
        gridTemplateColumns="80% 20%"
      >
        <TextField
          placeholder="Ask AI"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          sx={{ bgcolor: "#FFF" }}
        />
        <Button
          variant="contained"
          onClick={() => {
            StartChat(userInput);
            setUserInput("");
          }}
          sx={{ ml: 1 }}
        >
          {isWaiting ? (
            <CircularProgress
              sx={{ height: "5px", width: "5px", color: "#FFF" }}
            />
          ) : (
            "Send"
          )}
        </Button>
      </Box>
    </AppLayout>
  );
};

export default ChatAI;
