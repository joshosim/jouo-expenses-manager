import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Home from "../pages/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Expenses from "../pages/Expenses";
import TheDate from "../pages/Date";
import ChatAI from "../pages/ChatAI";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    return currentUser ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/expenses"
        element={
          <AuthGuard>
            <Expenses />
          </AuthGuard>
        }
      />
      <Route
        path="/date"
        element={
          <AuthGuard>
            <TheDate />
          </AuthGuard>
        }
      />
      <Route
        path="/chat-ai"
        element={
          <AuthGuard>
            <ChatAI />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <Profile />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
