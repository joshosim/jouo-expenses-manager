import { Box, Fab, Typography } from "@mui/material";
import React, { useState } from "react";
import { Add, Calculate, Logout } from "@mui/icons-material";
import BottomDrawer from "../component/BottomDrawer";
import AddExpenses from "../component/AddExpenses";
import CalculateExpenditure from "../component/CalculateExpenditure";
import supabase from "../config/supabaseClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [fetchError, setFetchError] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);
  const goTo = useNavigate();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
 

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase.from("expenses").select();

      if (error) {
        setFetchError("Could not fetch data");
        setExpenses([]);
        console.log(error);
      }
      if (data) {
        setFetchError("");
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
       const getTotalAmtOfExpenses = async () => {
         try {
           const { data, error } = await supabase
             .from("expenses")
             .select("amount", { count: "exact", head: true });
           if (error) {
             throw error;
           }

           const total = data?.reduce((acc, item) => acc + item.amount, 0);
           return total || 0;
         } catch (error) {
           console.error(error);
           return null;
         }
       };
      const total = await getTotalAmtOfExpenses();
      setTotalAmount(total);
    };
    fetchTotalExpenses();
  }, []);

  const [open, setOpen] = useState(false);
  const [openCal, setOpenCal] = useState(false);
  return (
    <>
      <Box p={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={30} fontWeight={700}>
            Hello, <br /> Osim
          </Typography>

          <div>
            <Calculate
              onClick={() => setOpenCal(true)}
              sx={{
                cursor: "pointer",
                mr: "15px",
                "::-ms-tooltip": "Calculate Expenses",
              }}
            />
            <Logout
              sx={{
                cursor: "pointer",
                "::-ms-tooltip": "Logout",
              }}
              onClick={() => goTo("/login")}
            />
          </div>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={16} fontWeight={600}>
            Recent transactions
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            Total : NGN {totalAmount !== null ? totalAmount : " ***"}
          </Typography>
        </Box>
        <Box sx={{ scrollBehavior: "smooth" }}>
          {fetchError && <p>{fetchError}</p>}
          {expenses && (
            <Box>
              {expenses.map((expense) => (
                <Box border="1px solid gray" borderRadius="8px" my={1} p={2}>
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
                  <Typography fontSize={14}>{expense.created_at}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        {!open && !openCal && (
          <Fab
            color="primary"
            sx={{ position: "absolute", bottom: 10, right: 10 }}
            onClick={() => setOpen(true)}
          >
            <Add />
          </Fab>
        )}
      </Box>
      <BottomDrawer open={open} onClose={() => setOpen(false)}>
        <AddExpenses />
      </BottomDrawer>
      <BottomDrawer
        drawerHeight="65"
        open={openCal}
        onClose={() => setOpenCal(false)}
      >
        <CalculateExpenditure />
      </BottomDrawer>
    </>
  );
};

export default Home;
