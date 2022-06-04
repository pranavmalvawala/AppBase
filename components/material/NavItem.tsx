import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props { url: string, label: string, icon: JSX.Element }

export const NavItem: React.FC<Props> = props => {
  return (
    <NavLink to={props.url}>
      <ListItemButton>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </NavLink >
  );
};
