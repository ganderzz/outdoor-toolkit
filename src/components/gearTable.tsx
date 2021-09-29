import { Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { GearStore } from "../stores/gearStore";
import { GearTableToolbar } from "./gearTableToolbar";

const columns: GridColDef[] = [
  {
    field: "item_name",
    headerName: "Item Name",
    width: 350,
    editable: true,
  },
  {
    field: "weight",
    headerName: "Weight",
    width: 150,
    editable: true,
    align: "right",
    type: "number",
    description: `The weight of the current item.`,
  },
];

function TableFooterComponent() {
  return (
    <div style={{ padding: 15 }}>
      Total Weight: <strong>{GearStore.weightInPounds}</strong>
    </div>
  );
}

const GearTable = view(() => {
  const [selectedRows, setSelectedRows] = React.useState<GridSelectionModel>(
    []
  );
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
  };

  return (
    <>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Gear List</Typography>
        <Button onClick={addGear}>Add Item</Button>
      </div>

      <DataGrid
        rows={GearStore.items}
        columns={columns}
        pageSize={100}
        components={{
          Footer: TableFooterComponent,
          Toolbar: () => (
            <GearTableToolbar selection={selectedRows} onDelete={removeRows} />
          ),
        }}
        onCellEditCommit={(params) => {
          GearStore.updateById(params.id as number, params.field, params.value);
        }}
        onSelectionModelChange={(selectionModel) =>
          setSelectedRows(selectionModel)
        }
        autoHeight
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  );
});

export { GearTable };
