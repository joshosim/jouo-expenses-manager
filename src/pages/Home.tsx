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

interface Expense {
  id: any;
  title: string;
  amount: number;
  created_at: Date;
}

const Home = () => {
  const [fetchError, setFetchError] = useState("");
  const goTo = useNavigate();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openCal, setOpenCal] = useState(false);
  const navigate = useNavigate();

  const formatTheTime = (isoDateString: any) => {
    const date = parseISO(isoDateString);
    const formattedDate = format(date, "yyyy-MM-dd HH:mm");
    return formattedDate;
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("expenses").select();
      console.log(data);
      setExpenses(data || []);
    };
    fetchData();
  }, []);

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
            <Typography fontSize={12} fontWeight={700} color="green">
              {currentUser.email}
            </Typography>
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
              {expenses.map((expense) => (
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
                    <Typography fontSize={14}>
                      {formatTheTime(expense.created_at.toLocaleString())}
                    </Typography>
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
        <AddExpenses />
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
