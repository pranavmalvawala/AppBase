import React from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  show?: boolean,
  appName?: string
}

export const SupportModal: React.FC<Props> = (props) => {
  const [showSupport, setShowSupport] = React.useState(props.show);

  const toggleShowSupport = () => {
    setShowSupport(!showSupport);
  }

  const getSubject = () => {
    if(props.appName)
      return `?subject=${props.appName} Support`;
    else
      return "";
  }

  return (<>
    <div style={{ position: "fixed", cursor: "pointer", color: "#03a9f4", fontSize: "30px", bottom: "1px", right: "10px"}} onClick={toggleShowSupport}><i className="fas fa-question-circle" /></div>
    <Modal show={showSupport} onHide={toggleShowSupport} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Get Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b><i className="fas fa-envelope fa-fw" /> Email:</b> <a href={"mailto:support@livecs.org" + getSubject()}>support@livecs.org</a></p>
        <p><b><i className="fas fa-mobile fa-fw" /> Phone:</b> <a href="tel:+19189942638">+1 (918) 994-2638</a></p>
        <p><b><i className="fab fa-facebook-messenger fa-fw" /> Messenger:</b> <a href="https://m.me/livecsolutions" target="_new">https://m.me/livecsolutions</a></p>
        <p><b><i className="fas fa-info-circle fa-fw" /> Knowledge Base:</b> <a href="http://support.churchapps.org" target="_new">http://support.churchapps.org</a></p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={toggleShowSupport}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>);
};
