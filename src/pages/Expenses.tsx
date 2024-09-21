import { Box, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import ThePie from "../component/ThePie";
import SecondPie from "../component/SecondPie";
import { useState } from "react";
import supabase from "../config/superbase";
import { useAuthContext } from "../context/AuthContext";

const Expenses = () => {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const { currentUser } = useAuthContext();
  const getTotalExpenses = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("amount")
      .eq("uuid", currentUser.id);

    if (error) {
      console.error("Error fetching total:", error);
    } else if (data) {
      const total = data.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalAmount(total);
    }
  };
  getTotalExpenses();
  const navigate = useNavigate();
  return (
    <AppLayout>
      <Box>
        <Box display="flex" alignItems="center" gap="8px" my={2}>
          <ChevronLeft
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          />
          <Typography fontWeight={600}>Expenses</Typography>
        </Box>
        <Box m={2}>
          <ThePie value={totalAmount || 0} />
        </Box>
        <Box m={2}>
          <SecondPie />
        </Box>
      </Box>
    </AppLayout>
  );
};

export default Expenses;
