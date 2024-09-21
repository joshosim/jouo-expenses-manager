import { MoreVert } from "@mui/icons-material";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  TextProps,
  Legend,
  LegendProps,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

const data: DataPoint[] = [
  { name: "Food", value: 30 },
  { name: "Transport", value: 25 },
  { name: "Bills", value: 10 },
  { name: "Giving", value: 25 },
  { name: "Project", value: 20 },
];

const COLORS = ["lightgreen", "yellow", "orange", "blue", "#E4E7EC"];

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  return (
    <Box>
      {payload?.map((entry, index) => (
        <Box
          key={`item-${index}`}
          sx={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          <Box
            sx={{ bgcolor: entry.color, borderRadius: "100%" }}
            height={8}
            width={8}
          />
          <Typography fontSize={14}> {entry.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default class SecondPie extends PureComponent {
  render() {
    return (
      <Box
        width="100%"
        height="100%"
        p="24px"
        borderRadius="12px"
        bgcolor="#FFFFFF"
        border="1px solid #E4E7EC"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} fontSize={18}>
            Monthly Expenses
          </Typography>
          <MoreVert />
        </Box>
        <Divider sx={{ my: "24px" }} />
        <Box display="flex" alignItems="start" justifyContent="space-between">
          <ResponsiveContainer width="70%" height={250}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box width="30%" display="flex" alignItems="center">
            <CustomLegend
              payload={data.map((entry, index) => ({
                value: entry.name,
                color: COLORS[index % COLORS.length],
              }))}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}
