import { createTheme } from "@mui/material";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: "Sora",
    },
    palette: {
      mode,
      primary: { main: "#379E66" },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "inherit",
            fontWeight: 700,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#fff" : "#000",
          },
        },
      },
    },
  });
