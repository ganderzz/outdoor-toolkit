import React from "react";
import { InputBase, TableCell } from "@mui/material";

export const EditableCell = ({
  children,
  placeholder,
  type = "text",
  onChange,
}: {
  type?: "text" | "number";
  placeholder?: string;
  children: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TableCell padding="none">
      <InputBase
        fullWidth
        type={type}
        placeholder={placeholder}
        style={{ border: 0, background: "transparent", width: "100%", padding: 16 }}
        value={children}
        onChange={onChange}
      />
    </TableCell>
  );
};
