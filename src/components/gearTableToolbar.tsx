import { exportDB } from "dexie-export-import";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ImportExportIcon from "@mui/icons-material/ImportExportRounded";
import React from "react";
import { db } from "../data/db";
import { IconButton } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";

interface IProps {
  selection: GridSelectionModel;
  onDelete: () => void;
}

export function GearTableToolbar({ selection, onDelete }: IProps) {
  const isSelectionEmpty = selection.length === 0;

  return (
    <div style={{ padding: 15 }}>
      <IconButton
        aria-label="delete"
        onClick={onDelete}
        disabled={isSelectionEmpty}
      >
        <DeleteRoundedIcon />
      </IconButton>

      <IconButton
        aria-label="import/export"
        onClick={async () => {
          const output = await exportDB(db, {
            prettyJson: true,
            progressCallback: (progress) => {
              console.log(progress);

              return true;
            },
          });

          console.log(await output.text());
        }}
      >
        <ImportExportIcon />
      </IconButton>
    </div>
  );
}
