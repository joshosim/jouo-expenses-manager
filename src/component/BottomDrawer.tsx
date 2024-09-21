import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { keyframes } from "@emotion/react";
import React from "react";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface BottomDrawerProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  drawerHeight?: string;
}

const BottomDrawer = ({
  children,
  open,
  onClose,
  drawerHeight = "70vh",
}: BottomDrawerProps) => {
  const theme = useTheme();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bgcolor="rgba(0, 0, 0, 0.5)"
        zIndex={9}
        onClick={onClose} // Close the drawer when backdrop is clicked
      />

      {/* Drawer */}
      <Box
        height={drawerHeight}
        position="fixed"
        width="100vw"
        bottom={0}
        left={0}
        bgcolor={theme.palette.background.paper}
        zIndex={10}
        borderRadius="24px 24px 0px 0px"
        sx={{
          animation: `${slideUp} 0.5s ease-out`,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          sx={{
            animation: `${fadeIn} 0.5s ease-out 0.3s forwards`,
            opacity: 0, // Start with 0 opacity for the fade-in effect
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="50px"
            height="4px"
            borderRadius="100px"
            bgcolor="grey"
          ></Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            overflowY: "scroll", // Use scroll to enable scrolling
            maxHeight: "calc(90vh - 40px)",
            pb: "40px",
            animation: `${fadeIn} 0.5s ease-out 0.8s forwards`,
            opacity: 0,
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar for webkit browsers
            },
            "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
            "scrollbar-width": "none", // Hide scrollbar for Firefox
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default BottomDrawer;
