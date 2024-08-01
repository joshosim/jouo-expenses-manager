import { Backdrop, Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { Done } from "@mui/icons-material";

const AddExpenses = () => {
  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState(false);
  const [onSend, setOnSend] = useState(false);
  const [sent, setSent] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(false);
    setOnSend(true);

    try {
      const res = await addDoc(collection(db, "user_expenses"), {
        title,
        amount,
        uid: currentUser.uid,
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", res.id);
      setOnSend(false);
      setSent(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    if (!title || !amount) {
      setFormError(true);
      return;
    }
  };

  return (
    <Box p={2}>
      <Typography mb={2} textAlign="center" fontWeight={600} fontSize={20}>
        AddExpenses
      </Typography>
      <form action="" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
          label="What for"
          type="text"
          placeholder="what for"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ borderRadius: "8px", p: "4px", mb: "12px" }}
          label="Amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        {/* <Box height="250px" /> */}
        <Button
          variant="contained"
          sx={{ p: "12px 24px" }}
          fullWidth
          type="submit"
        >
          {onSend ? "Adding....." : "Add"}
        </Button>
      </form>
      {formError && (
        <Typography
          color="red"
          border="1px solid red"
          borderRadius="12px"
          p="12px"
          my={2}
          textAlign="center"
        >
          Please fill all fields
        </Typography>
      )}

      {sent && (
        <Backdrop open={sent}>
          <Box bgcolor="#FFF" height="150px" width="200px" borderRadius="10px">
            <Button variant="text" color="primary" startIcon={<Done />}>
              Sent
            </Button>
            <Button variant="text" color="error" onClick={() => setSent(false)}>
              Close
            </Button>
            <Typography>Close and Refresh your app</Typography>
          </Box>
        </Backdrop>
      )}
    </Box>
  );
};

export default AddExpenses;
