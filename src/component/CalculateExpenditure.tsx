import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CalculateExpenditure = () => {
  const [money, setMoney] = useState(0);
  const [tithe, setTithe] = useState(0);
  const [savings, setSavings] = useState(0);
  const [needs, setNeeds] = useState(0);
  const [wants, setWants] = useState(0);

  const handleCalculate = (money: number) => {
    let tithe = money * 0.1;
    let theMoney = money - tithe;
    let savings = theMoney * 0.1;
    let needs = theMoney * 0.5;
    let wants = theMoney * 0.4;
    setTithe(tithe);
    setSavings(savings);
    setNeeds(needs);
    setWants(wants);
  };
  return (
    <Box p={2}>
      <Typography mb={2} textAlign="center" fontWeight={600} fontSize={20}>
        Calculate Expenditure
      </Typography>

      <TextField
        variant="outlined"
        fullWidth
        InputProps={{ disableUnderline: true }}
        sx={{ borderRadius: "8px", p: "4px" }}
        label="Amount"
        type="number"
        value={money}
        placeholder="Amount"
        onChange={(e) => setMoney(parseFloat(e.target.value))}
      />
      <Grid
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <Box
          height="100px"
          sx={{
            display: "grid",
            placeItems: "center",
            p: "12px",
            border: "1px solid gray",
            borderRadius: "8px",
            my: "8px",
          }}
        >
          <Typography>TITHE</Typography>
          {tithe}
        </Box>
        <Box
          height="100px"
          sx={{
            display: "grid",
            placeItems: "center",
            p: "12px",
            border: "1px solid gray",
            borderRadius: "8px",
            my: "8px",
          }}
        >
          <Typography>SAVINGS</Typography>
          {savings}
        </Box>
        <Box
          height="100px"
          sx={{
            display: "grid",
            placeItems: "center",
            p: "12px",
            border: "1px solid gray",
            borderRadius: "8px",
            my: "8px",
          }}
        >
          <Typography>NEEDS</Typography>
          {needs}
        </Box>
        <Box
          height="100px"
          sx={{
            display: "grid",
            placeItems: "center",
            p: "12px",
            border: "1px solid gray",
            borderRadius: "8px",
            my: "8px",
          }}
        >
          <Typography>WANTS</Typography>
          {wants}
        </Box>
      </Grid>
      <Button
        variant="contained"
        sx={{ p: "12px 24px" }}
        fullWidth
        onClick={() => handleCalculate(money)}
      >
        Calculate
      </Button>
    </Box>
  );
};

export default CalculateExpenditure;
