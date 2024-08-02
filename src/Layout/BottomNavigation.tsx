import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// import { ReactComponent as ScheduleIcon } from "assets/schedule-icon.svg";
// import { ReactComponent as TripIcon } from "assets/trips-icon.svg";
// import { ReactComponent as WalletIcon } from "assets/wallets-icon.svg";
// import { ReactComponent as ActivityIcon } from "assets/activities-icon.svg";
import { useNavigate } from "react-router-dom";
import {
  ChatBubble,
  Dashboard,
  DataUsage,
  Home,
  Person2Outlined,
} from "@mui/icons-material";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          "&.MuiBottomNavigation-root": {
            height: "60px",
            boxShadow:
              "0px 2px 4px -2px #1018280F, 0px -4px 8px -2px #1018281A",
          },
          ".MuiBottomNavigationAction-label": {
            mt: 1,
            color: "#98A2B3",
            fontSize: "0.6rem",
          },
          ".Mui-selected": {
            fontSize: "0.65rem !important",
            fontWeight: 700,
          },
        }}
      >
        <BottomNavigationAction
          onClick={() => {
            navigate("/");
          }}
          label="Home"
          icon={<Home />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate("/expenses");
          }}
          label="Expenses"
          icon={<Dashboard />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate("/date");
          }}
          label="Date"
          icon={<DataUsage />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate("/chat-ai");
          }}
          label="AI"
          icon={<ChatBubble />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate("/profile");
          }}
          label="Accounts"
          icon={<Person2Outlined />}
        />
      </BottomNavigation>
    </Box>
  );
}
