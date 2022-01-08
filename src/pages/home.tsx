import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";

export const HomePage = observer(() => {
  const { GearStore } = useStores();

  return (
    <>
      <Typography fontWeight={600} sx={{ mb: 2 }} variant="h4">
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2">Total Gear Items</Typography>
              <Typography variant="h4">{GearStore.items.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2">Total Weight</Typography>
              <Typography variant="h4">{GearStore.weightInPounds}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
});
