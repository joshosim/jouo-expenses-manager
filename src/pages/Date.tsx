import { Scheduler } from "@aldabil/react-scheduler";
import { ChevronLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";

const TheDate = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <Box>
        <Box display="flex" alignItems="center" gap="8px" my={2}>
          <ChevronLeft
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          />
          <Typography fontWeight={600}>Date Manager</Typography>
        </Box>

        <div style={{ margin: "20px" }}>
          <Scheduler
            view="month"
            events={[
              {
                event_id: 1,
                title: "Event 1",
                start: new Date("2021/5/2 09:30"),
                end: new Date("2021/5/2 10:30"),
              },
              {
                event_id: 2,
                title: "Event 2",
                start: new Date("2021/5/4 10:00"),
                end: new Date("2021/5/4 11:00"),
              },
            ]}
          />
        </div>
      </Box>
    </AppLayout>
  );
};

export default TheDate;
