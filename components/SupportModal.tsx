import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from "@mui/material";
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
        <p><b><Icon>mail</Icon> Email:</b> <a href={"mailto:support@livecs.org" + getSubject()}>support@livecs.org</a></p>
        <p><b><Icon>phone_iphone</Icon> Phone:</b> <a href="tel:+19189942638">+1 (918) 994-2638</a></p>
        <p><b><Icon>forum</Icon> Messenger:</b> <a href="https://m.me/livecsolutions" target="_new">https://m.me/livecsolutions</a></p>
        <p><b><Icon>info</Icon> Knowledge Base:</b> <a href="https://support.churchapps.org" target="_new">https://support.churchapps.org</a></p>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </>);
};
