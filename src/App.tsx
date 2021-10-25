import React from "react";
import { AppBar, Toolbar, Typography, Container, Card } from "@mui/material";
import { observer } from "mobx-react-lite";
import GearTable from "./components/gearTable";
import { useStores } from "./stores";

function App() {
  const { GearStore } = useStores();

  React.useEffect(() => {
    GearStore.getAll();
  }, []);

  return (
    <section
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        background: "#FAF8F4",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        style={{
          background: "#000",
          color: "white",
          marginBottom: 40,
        }}
      >
        <Toolbar>
          <Typography variant="h6">Outdoor Toolkit</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <GearTable />
      </Container>
    </section>
  );
}

export default observer(App);
