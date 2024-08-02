import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import SimpleBottomNavigation from "./BottomNavigation";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        minHeight="100vh"
        overflow="hidden"
      >
        <Box flex={1} minHeight="100vh" sx={{ overflowY: "auto", pb: 13 }}>
          {children}
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          zIndex: 1,
          display: { md: "none", xs: "block" },
        }}
      >
        <SimpleBottomNavigation />
      </Box>
    </>
  );
};

export default AppLayout;
