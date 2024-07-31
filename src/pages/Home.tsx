import { Box, Fab, Typography } from "@mui/material";
import { useState } from "react";
import { Add, Calculate, Logout } from "@mui/icons-material";
import BottomDrawer from "../component/BottomDrawer";
import AddExpenses from "../component/AddExpenses";
import CalculateExpenditure from "../component/CalculateExpenditure";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [fetchError, setFetchError] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);
  const goTo = useNavigate();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("user");
        console.log("// Sign-out successful.");
        goTo("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      async function getTotalAmtOfExpenses() {
        try {
        } catch (error) {
          console.error("Error fetching sum: ", error);
          return null;
        }
      }
      getTotalAmtOfExpenses();
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
              onClick={logout}
            />
          </div>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={16} fontWeight={600}>
            Recent transactions
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            Spent : NGN {totalAmount !== null ? totalAmount : " ***"}
          </Typography>
        </Box>
        <Box sx={{ scrollBehavior: "smooth" }}>
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
                Food
              </Typography>
              <Typography fontWeight={600} fontSize={14}>
                - NGN 1000
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={14}>14th Aug</Typography>
              <Typography fontSize={14}>4: 00pm</Typography>
            </div>
          </Box>
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontSize={14}>
                      {format(expense.created_at, "EEE")}
                    </Typography>
                    <Typography fontSize={14}>
                      {format(expense.created_at, "h:mm a")}
                    </Typography>
                  </div>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        {!open && !openCal && (
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 10, right: 10 }}
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
