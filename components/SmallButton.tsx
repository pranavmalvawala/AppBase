import React from "react";
import { Button, Icon, Tooltip } from "@mui/material";

interface Props {
  ariaLabel?: string;
  text?: string;
  icon: string;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  toolTip?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const SmallButton = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick(e);
  }

  const style = (props.text)
    ? { backgroundColor: props.color, "& span": { marginRight: 1 } }
    : { minWidth: "auto", padding: "4px 4px" }

  return (
    <Tooltip title={props.toolTip || ""} arrow placement="top">
      <Button sx={style} variant={props.text ? "outlined" : "text"} color={props.color} aria-label={props.ariaLabel || "editButton"} onClick={handleClick} size="small">
        <Icon>{props.icon}</Icon>{(props.text) ? props.text : ""}
      </Button>
    </Tooltip>
  );

});
