import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Stack } from "@mui/material";
import React from "react";

interface Props {
  appName?: string
  onClose: () => void
}

export const SupportModal: React.FC<Props> = (props) => {

  const getSubject = () => {
    if (props.appName) return `?subject=${props.appName} Support`;
    else return "";
  }

  return (<>
    <Dialog open={true} {...props}>
      <DialogTitle>Get Support</DialogTitle>
      <DialogContent>
        <Stack direction="row" alignItems="center" sx={{flexWrap: "wrap"}} mb={2}><b><Stack direction="row" alignItems="center" mr="5px"><Icon sx={{marginRight: "5px"}}>mail</Icon> Email:</Stack></b> <a href={"mailto:support@livecs.org" + getSubject()}>support@livecs.org</a></Stack>
        <Stack direction="row" alignItems="center" sx={{flexWrap: "wrap"}} mb={2}><b><Stack direction="row" alignItems="center" mr="5px"><Icon sx={{marginRight: "5px"}}>phone_iphone</Icon> Phone:</Stack></b> <a href="tel:+19189942638">+1 (918) 994-2638</a></Stack>
        <Stack direction="row" alignItems="center" sx={{flexWrap: "wrap"}} mb={2}><b><Stack direction="row" alignItems="center" mr="5px"><Icon sx={{marginRight: "5px"}}>forum</Icon> Messenger:</Stack></b> <a href="https://m.me/livecsolutions" target="_new">https://m.me/livecsolutions</a></Stack>
        <Stack direction="row" alignItems="center" sx={{flexWrap: "wrap"}}><b><Stack direction="row" alignItems="center" mr="5px"><Icon sx={{marginRight: "5px"}}>info</Icon> Knowledge Base:</Stack></b> <a href="https://support.churchapps.org" target="_new">https://support.churchapps.org</a></Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </>);
};
