import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Home from "../pages/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
    </Routes>
  );
};

export default AppRoutes;
