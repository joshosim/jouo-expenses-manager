import { Backdrop, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AddExpenses = () => {
  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState(false);
  const [onSend, setOnSend] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError(false);

    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
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
          Add
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

      {onSend && (
        <Backdrop open={onSend}>
          <Box bgcolor="#FFF" height="200px" width="200px">
            <Button
              variant="text"
              color="primary"
              onClick={() => setOnSend(false)}
            >
              Close
            </Button>
          </Box>
        </Backdrop>
      )}
    </Box>
  );
};

export default AddExpenses;
