import React from "react";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const NavItem = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <NavLink
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        padding: "0px 12px",
        color: "#FFF",
        textDecoration: "none",
        height: "100%",
        background: isActive ? "#333" : "transparent",
      })}
      to={to}
    >
      <Typography variant="body2">{children}</Typography>
    </NavLink>
  );
};
