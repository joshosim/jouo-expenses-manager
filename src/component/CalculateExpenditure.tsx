import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CalculateExpenditure = () => {
  const [money, setMoney] = useState(0);
  const [food, setFood] = useState(0);
  const [transport, setTransport] = useState(0);
  const [giving, setGiving] = useState(0);
  const [project, setProject] = useState(0);
  const [bills, setBills] = useState(0);

  const handleCalculate = (money: number) => {
    let food = money * 0.35;
    let transport = money * 0.2;
    let bills = money * 0.1;
    let giving = money * 0.2;
    let project = money * 0.15;
    setFood(food);
    setTransport(transport);
    setGiving(bills);
    setBills(giving);
    setProject(project);
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
        placeholder="Salary"
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
          <Typography>FOOD</Typography>
          {food}
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
          <Typography>BILLS</Typography>
          {bills}
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
          <Typography>TRANSPORT</Typography>
          {transport}
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
          <Typography>PROJECT</Typography>
          {project}
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
          <Typography>GIVING</Typography>
          {giving}
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
