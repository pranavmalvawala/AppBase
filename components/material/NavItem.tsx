import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
  url: string;
  label: string;
  icon: JSX.Element;
}

export const NavItem: React.FC<Props> = (props) => {
  const StyledNavLink = styled(NavLink)({
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      color: "black"
    }
  });

  return (
    <StyledNavLink to={props.url}>
      <ListItemButton sx={{ color: "black" }}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </StyledNavLink>
  );
};
