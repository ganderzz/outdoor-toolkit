import {
  Button,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../stores";
import { EditableCell } from "./dataGrid/editableCell";

const GearTable = () => {
  const { GearStore } = useStores();
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const addGear = async () => {
    await GearStore.add({
      item_name: "",
      weight: 0.0,
      weight_measurement: "g",
    });
  };

  const removeRows = async () => {
    selectedRows.forEach((id) => {
      GearStore.delete(id as number);
    });

    setSelectedRows([]);
  };

  return (
    <>
      <div
        style={{
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography fontWeight={600} variant="h4">
            Gear List
          </Typography>
          <Typography fontWeight={200} variant="h6">
            A place to list out all your gear.
          </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button disableElevation variant="contained" onClick={addGear}>
            Add Item
          </Button>

          <Button
            style={{ marginLeft: 4 }}
            variant="outlined"
            disabled={selectedRows.length === 0}
            onClick={removeRows}
          >
            Delete Selection
          </Button>
        </div>
      </div>

      <Divider style={{ marginTop: 8 }} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%"></TableCell>
            <TableCell width="50%">Item</TableCell>
            <TableCell width="20%">Weight</TableCell>
            <TableCell width="25%">Manufacturer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GearStore.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography>Empty</Typography>
              </TableCell>
            </TableRow>
          )}

          {GearStore.items.map((item) => {
            const isSelected = selectedRows.includes(item.id);

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        setSelectedRows(selectedRows.filter((id) => id !== item.id));
                      } else {
                        setSelectedRows([...selectedRows, item.id]);
                      }
                    }}
                  />
                </TableCell>
                <EditableCell
                  placeholder="Enter item's name here."
                  onChange={(e) => GearStore.updateById(item.id, "item_name", e.currentTarget.value)}
                >
                  {item.item_name}
                </EditableCell>

                <EditableCell
                  type="number"
                  placeholder="Enter item's weight here."
                  onChange={(e) => GearStore.updateById(item.id, "weight", e.currentTarget.value)}
                >
                  {item.weight}
                </EditableCell>
                <TableCell>{item.manufacturer}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              Total Weight: <strong>{GearStore.weightInPounds}</strong>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default observer(GearTable);
