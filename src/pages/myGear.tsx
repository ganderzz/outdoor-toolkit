import React from "react";
import { observer } from "mobx-react-lite";
import GearTable from "../components/gearTable";
import { Typography } from "@mui/material";

export const MyGearPage = observer(() => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography fontWeight={600} variant="h4">
        My Gear
      </Typography>

      <GearTable />
    </div>
  );
});
