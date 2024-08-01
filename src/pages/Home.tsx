import { Box, Fab, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Add, Calculate, Logout } from "@mui/icons-material";
import BottomDrawer from "../component/BottomDrawer";
import AddExpenses from "../component/AddExpenses";
import CalculateExpenditure from "../component/CalculateExpenditure";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import ExpensesLogo from "../assets/expe.png";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

interface Expense {
  title: string;
  amount: number;
  timestamp: Date;
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
  const [effectRunCount, setEffectRunCount] = useState(0);

  const fetchUserExpenses = async (): Promise<Expense[]> => {
    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    const expensesRef = collection(db, "user_expenses");

    const q = query(
      expensesRef,
      where("uid", "==", currentUser.uid),
      orderBy("timestamp", "desc") // Order by timestamp in descending order
    );
    const querySnapshot = await getDocs(q);

    const userExpenses: Expense[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const timestamp = (data.timestamp as Timestamp)?.toDate();
      userExpenses.push({
        ...data,
        id: doc.id,
        timestamp,
      } as unknown as Expense);
    });

    return userExpenses;
  };

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expensesData = await fetchUserExpenses();
        setExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, [fetchUserExpenses()]);

  if (loading) return <Box>Loading...</Box>;

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

  return (
    <>
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
            <Logout
              sx={{
                cursor: "pointer",
                "::-ms-tooltip": "Logout",
              }}
              onClick={logout}
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
                      {expense.timestamp &&
                        `on ${expense.timestamp.toLocaleString()}`}
                    </Typography>
                    {/* <Typography fontSize={14}>{expense.timestamp}</Typography> */}
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
            sx={{ position: "fixed", bottom: 10, right: 10 }}
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
    </>
  );
};

export default Home;
