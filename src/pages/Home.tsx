import { Box, Fab, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Add, Calculate, Logout } from "@mui/icons-material";
import BottomDrawer from "../component/BottomDrawer";
import AddExpenses from "../component/AddExpenses";
import CalculateExpenditure from "../component/CalculateExpenditure";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ExpensesLogo from "../assets/expe.png";

import { AuthContext } from "../context/AuthContext";
import AppLayout from "../Layout/AppLayout";
import supabase from "../config/superbase";
import { parseISO, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../services/expenses";

const Home = () => {
  const [fetchError, setFetchError] = useState("");
  const goTo = useNavigate();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openCal, setOpenCal] = useState(false);
  const navigate = useNavigate();

  const formatTheTime = (isoDateString: any) => {
    const date = parseISO(isoDateString);
    const formattedDate = format(date, "yyyy-MM-dd HH:mm");
    return formattedDate;
  };
  const query = useQuery({
    queryKey: ["EXPENSES", currentUser.id],
    queryFn: () => getExpenses(currentUser.id),
  });

  const expenses = query.data || [];

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
      // console.log("Total amount:", data);
    }
  };
  getTotalExpenses();

  return (
    <AppLayout>
      <Box p={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <img
              src={ExpensesLogo}
              alt="/"
              style={{ objectFit: "cover" }}
              height="75px"
              width="75px"
            />
          </Box>

          <div>
            <Calculate
              onClick={() => setOpenCal(true)}
              sx={{
                cursor: "pointer",
                mr: "15px",
                "::-ms-tooltip": "Calculate Expenses",
              }}
            />
          </div>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="24px"
        >
          <Typography fontSize={16} fontWeight={600}>
            Recent transactions
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            Spent : NGN {totalAmount !== null ? totalAmount : " ***"}
          </Typography>
        </Box>
        <Box sx={{ scrollBehavior: "smooth" }}>
          {fetchError && <p>{fetchError}</p>}
          {expenses && (
            <Box>
              {expenses.map((expense: any) => (
                <Box
                  key={expense.id}
                  border="1px solid gray"
                  borderRadius="8px"
                  my={1}
                  p={2}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography fontWeight={600} fontSize={14}>
                      {expense.title}
                    </Typography>
                    <Typography fontWeight={600} fontSize={14}>
                      - NGN {expense.amount}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontSize={14}>{expense.created_at}</Typography>
                  </div>
                </Box>
              ))}
            </Box>
          )}
          {!expenses && (
            <Box>
              <Typography>No Expenses Made Today</Typography>
            </Box>
          )}
        </Box>
        {!open && !openCal && (
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 90, right: 10 }}
            onClick={() => setOpen(true)}
          >
            <Add />
          </Fab>
        )}
      </Box>
      <BottomDrawer
        open={open}
        onClose={() => setOpen(false)}
        drawerHeight="50vh"
      >
        <AddExpenses onClose={() => setOpen(false)} />
      </BottomDrawer>
      <BottomDrawer
        drawerHeight="65"
        open={openCal}
        onClose={() => setOpenCal(false)}
      >
        <CalculateExpenditure />
      </BottomDrawer>
    </AppLayout>
  );
};

export default Home;
