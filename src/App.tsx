import {
  AppBar,
  Paper,
  Table,
  TableContainer,
  Toolbar,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { GearStore } from "./stores/gearStore";

function App() {
  React.useEffect(() => {
    GearStore.getAll();
  }, []);

  const addGear = async () => {
    await GearStore.add({
      item_name: "",
      weight: 0.0,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        background: "#F1F1F1",
      }}
    >
      <AppBar
        position="static"
        style={{
          background: "#333",
          color: "#FFF",
        }}
        className="app-header"
      >
        <Toolbar>
          <Typography variant="h6">Outdoor Toolkit</Typography>
        </Toolbar>
      </AppBar>

      <section style={{ padding: 20 }}>
        <TableContainer component={Paper}>
          <div
            style={{
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Gear List</Typography>
            <Button variant="contained" onClick={addGear}>
              Add Item
            </Button>
          </div>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell colSpan={2}>Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {GearStore.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="text"
                      name="item_name"
                      value={item.item_name}
                      style={{
                        width: "100%",
                        border: 0,
                        background: "transparent",
                        padding: 8,
                      }}
                      onChange={(e) => {
                        GearStore.update({
                          ...item,
                          item_name: e.currentTarget.value,
                        });
                      }}
                      placeholder="Add name of item here"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      name="weight"
                      value={item.weight}
                      min={0}
                      style={{
                        width: "100%",
                        border: 0,
                        background: "transparent",
                        padding: 8,
                      }}
                      onChange={(e) => {
                        GearStore.update({
                          ...item,
                          weight: parseInt(e.currentTarget.value, 10),
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => GearStore.delete(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {GearStore.items.length > 0 && (
                <TableRow style={{ height: 53 }}>
                  <TableCell style={{ fontWeight: 600 }}>Total</TableCell>
                  <TableCell>{GearStore.totalWeight}g</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}

export default view(App);
