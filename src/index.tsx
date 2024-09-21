import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { toastOption } from "./config/toastConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CustomThemeProvider>
            <Toaster toastOptions={toastOption} />
            <AppRoutes />
          </CustomThemeProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
