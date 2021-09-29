import { AppBar, Toolbar, Typography, Container, Card } from "@mui/material";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { GearStore } from "./stores/gearStore";
import { GearTable } from "./components/gearTable";

function App() {
  React.useEffect(() => {
    GearStore.getAll();
  }, []);

  return (
    <section
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        background: "hsl(0 0% 95%)",
      }}
    >
      <AppBar
        position="static"
        style={{
          background: "hsl(0 0% 27%)",
          color: "white",
          marginBottom: 40,
        }}
      >
        <Toolbar>
          <Typography variant="h6">Outdoor Toolkit</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Card style={{ minHeight: 100 }}>
          <GearTable />
        </Card>
      </Container>
    </section>
  );
}

export default view(App);
