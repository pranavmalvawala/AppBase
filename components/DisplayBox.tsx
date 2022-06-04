import React from "react";
import { Paper, Box, Typography, styled, Button } from "@mui/material";

interface Props {
    id?: string,
    children: React.ReactNode,
    headerIcon?: string,
    headerText: string,
    editFunction?: () => void
    editContent?: React.ReactNode;
    "data-cy"?: string;
    ariaLabel?: string;
}

export const DisplayBox = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

  const CustomContextBox = styled(Box)({
    marginTop: 10,
    overflowX: "hidden",
    "& p": {
      color: "#666"
    },
    "& label": {
      color: "#999"
    },
    "& ul": {
      paddingLeft: 0
    },
    "& li": {
      listStyleType: "none",
      marginBottom: 10,
      "& i": {
        marginRight: 5
      }
    },
    "& td": {
      "& i": {
        marginRight: 5
      }
    }
  })

  let editContent: React.ReactNode;
  if (props.editFunction !== undefined) editContent = <Button sx={{ px: 0, minWidth: "auto" }} aria-label={props.ariaLabel || "editButton"} onClick={props.editFunction}><i className="fas fa-pencil-alt" style={{ color: "#1976d2" }} /></Button>;
  else if (props.editContent !== undefined) editContent = props.editContent;
  return (
    <Paper sx={{ padding: 2 }} id={props.id} data-cy={props["data-cy"] || ""}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {props.headerIcon && <i className={props.headerIcon} style={{ color: "#1976d2" }} />}
          <Typography component="h2" sx={{ display: "inline-block", marginLeft: props.headerIcon ? 1: 0 }} variant="h6" color="primary">
            {props.headerText}
          </Typography>
        </Box>
        <Box>
          {editContent}
        </Box>
      </Box>
      <CustomContextBox ref={ref} data-cy="content">{props.children}</CustomContextBox>
    </Paper>
  );
})
