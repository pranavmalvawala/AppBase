import React from "react";
import { Paper, Box, Typography, Stack, styled, Button } from "@mui/material";

interface Props {
  id?: string;
  children?: React.ReactNode;
  headerIcon?: string;
  headerText: string;
  saveText?: string;
  headerActionContent?: React.ReactNode;
  cancelFunction?: () => void;
  deleteFunction?: () => void;
  saveFunction: () => void;
  "data-cy"?: string;
  className?: string;
  isSubmitting?: boolean;
  ariaLabelDelete?: string;
  ariaLabelSave?: string;
  saveButtonType?: "submit" | "button";
}
export function InputBox({
  id,
  children,
  headerIcon,
  headerText,
  saveText = "Save",
  headerActionContent,
  "data-cy": dataCy,
  cancelFunction,
  deleteFunction,
  saveFunction,
  className = "",
  isSubmitting = false,
  ariaLabelDelete = "",
  ariaLabelSave = "",
  saveButtonType = "submit"
}: Props) {

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

  let buttons = [];
  
  if (saveFunction)
    buttons.push(
      <Button
        type={saveButtonType}
        variant="contained"
        disableElevation
        aria-label={ariaLabelSave}
        onClick={saveFunction}
        disabled={isSubmitting}
        sx={{ 
          "&:focus": {
            outline: "none"
          }
        }}
      >
        {saveText}
      </Button>
    );

    if (deleteFunction)
      buttons.push(
        <Button
          id="delete"
          variant="outlined"
          aria-label={ariaLabelDelete}
          onClick={deleteFunction}
          color="error"
          sx={{ 
            "&:focus": {
              outline: "none"
            }
          }}
        >
          Delete
        </Button>
    );
      
    if (cancelFunction)
      buttons.push(
        <Button
          onClick={cancelFunction}
          color="warning"
          sx={{ 
            "&:focus": {
              outline: "none"
            }
          }}
        >
           Cancel
        </Button>
    );

  let classNames = ["inputBox"];
  if (className) {
    classNames.push(className);
  }

  return (
    <Paper id={id} sx={{ padding: 2 }} data-cy={dataCy}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} data-cy="header">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {headerIcon && <i className={headerIcon} style={{ color: "#1976d2" }} />}
          <Typography component="h2" sx={{ display: "inline-block", marginLeft: headerIcon ? 1: 0 }} variant="h6" color="primary">
            {headerText}
          </Typography>
        </Box>
        <Box>
          {headerActionContent}
        </Box>
      </Box>
      <CustomContextBox>{children}</CustomContextBox>
      <Stack direction="row" sx={{ marginTop: 1 }} spacing={1}>
        {buttons}
      </Stack>
    </Paper>
  );
}
