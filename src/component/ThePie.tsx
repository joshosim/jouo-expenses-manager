import { ArrowUpward, MoreVert } from "@mui/icons-material";
import { Box, Chip, Divider, Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

interface GaugeChartProps {
  value: number; // Value between 0 and 100
}

const ThePie: React.FC<GaugeChartProps> = ({ value }) => {
  const data = [
    { name: "Value", value: value },
    { name: "Remaining", value: 100000 - value },
  ];

  const COLORS = ["#379E66", "#E0E0E0"];

  return (
    <Box
      width="100%"
      height="auto"
      borderRadius="12px"
      bgcolor="#FFFFFF"
      border="1px solid #E4E7EC"
    >
      <Box
        height="93px"
        p="12px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <Typography fontWeight={600} fontSize={18}>
            Monitor Expenses
          </Typography>
          <Typography fontSize={14}>
            You have spent 80% of monthly schedule.
          </Typography>
        </div>
        <MoreVert />
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        p="24px"
      >
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={100}
              dataKey="value"
              //cornerRadius={10}
              stroke="none"
              fill="#E0E0E0"
            >
              {data.map((entry, index) => {
                if (index === 1) {
                  return <Cell key={`cell-${index}`} fill="#E0E0E0" />;
                }
                return <Cell key={`cell-${index}`} fill="#379E66" />;
              })}
              <Label
                //value={`${value}`}
                value={data[0].value}
                position="center"
                style={{
                  fontSize: "24px",
                  fill: "#000",
                  fontWeight: 600,
                  fontFamily: "Sora",
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Chip
          label="10"
          size="small"
          sx={{ fontSize: "14px", bgcolor: "#ABEFC6", color: "#067647" }}
          icon={
            <ArrowUpward
              sx={{ height: "16px", width: "16px" }}
              color="primary"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default ThePie;
