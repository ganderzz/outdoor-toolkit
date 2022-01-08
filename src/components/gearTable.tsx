import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { supabase } from "../data/supabase";
import { useStores } from "../stores";
import { AsyncSelect } from "./asyncSelect";
import { EditableCell } from "./dataGrid/editableCell";

const GearTable = () => {
  const { GearStore } = useStores();
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  React.useEffect(() => {
    GearStore.getAll();
  }, []);

  const addGear = async () => {
    await GearStore.add({
      name: "",
      created_at: new Date().toUTCString(),
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
            <TableCell width="20%">Weight (oz)</TableCell>
            <TableCell width="25%">Manufacturer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!GearStore.isLoading && GearStore.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography>Empty</Typography>
              </TableCell>
            </TableRow>
          )}

          {GearStore.isLoading ? (
            <TableRow>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
            </TableRow>
          ) : (
            GearStore.items.map((item) => {
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
                    onChange={(e) => GearStore.updateById(item.id, "name", e.currentTarget.value)}
                  >
                    {item.name}
                  </EditableCell>

                  <EditableCell
                    type="number"
                    placeholder="Enter item's weight here."
                    onChange={(e) => GearStore.updateById(item.id, "weight", e.currentTarget.value)}
                  >
                    {item.weight}
                  </EditableCell>
                  <TableCell>
                    <AsyncSelect
                      value={item.manufacturer}
                      onChange={(_, val) => GearStore.updateById(item.id, "manufacturer_id", val?.id ?? null)}
                      onLoad={async () => {
                        const { data } = await supabase.from("manufacturer").select();

                        return data;
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
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
