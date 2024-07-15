import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Sora",
  },
  palette: {
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
  },
});
