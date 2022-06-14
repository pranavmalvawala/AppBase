import React from "react";
import { Button, Icon, Tooltip } from "@mui/material";

interface Props {
  ariaLabel?: string;
  text?: string;
  icon: string;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  toolTip?: string;
  onClick: (e: React.MouseEvent) => void;
}

export const SmallButton = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick(e);
  }

  const style = (props.text)
    ? { backgroundColor: props.color || "#444", "& span": { marginRight: 5 } }
    : { minWidth: "auto", padding: "4px 4px", backgroundColor: props.color || "#444", "& span": { fontSize: "1rem" } }

  return (
    <Tooltip title={props.toolTip || ""} arrow placement="top">
      <Button style={style} variant="contained" color={props.color} aria-label={props.ariaLabel || "editButton"} onClick={handleClick} size="small">
        <Icon>{props.icon}</Icon>{(props.text) ? props.text : ""}
      </Button>
    </Tooltip>
  );

});
