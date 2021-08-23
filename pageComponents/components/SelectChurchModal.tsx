import React from "react";
import { ChurchInterface, GenericSettingInterface } from "../../interfaces";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { ArrayHelper } from "../../helpers";

interface Props {
  show: boolean,
  churches?: ChurchInterface[],
  selectChurch: (churchId: string) => void
}

export const SelectChurchModal: React.FC<Props> = (props) => {

  const getRow = (church: ChurchInterface) => {
    let logo = "/images/logo.png";
    if (church.settings) {
      let l: GenericSettingInterface = ArrayHelper.getOne(church.settings, "keyName", "logoLight");
      if (l?.value) logo = l.value;
    }

    return (<a href="about:blank" style={{ fontSize: "1.125rem", display: "block", marginTop: 20, marginBottom: 20 }} onClick={(e) => { e.preventDefault(); props.selectChurch(church.id) }}>
      <Row>
        <Col md={6}><img src={logo} alt="church logo" className="w-100 h-auto" /></Col>
        <Col md={6} className="m-auto">{church.name}</Col>
      </Row>
    </a>);
  }

  return (
    <Modal show={props.show} backdrop="static" keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title>Select Church</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {
            props.churches?.map(c => (getRow(c)))
          }
        </Container>
      </Modal.Body>
    </Modal>
  );
};
