import React from "react";
import { Row, Col, InputGroup, Button, FormControl } from "react-bootstrap";
import { ApiHelper, ArrayHelper } from "../../helpers"
import { ChurchInterface, GenericSettingInterface } from "../../interfaces";

interface Props {
  selectChurch: (churchId: string) => void,
  church: ChurchInterface
}

export const SelectableChurch: React.FC<Props> = (props) => {

  let logo = "/images/logo.png";
  if (props.church.settings) {
    let l: GenericSettingInterface = ArrayHelper.getOne(props.church.settings, "keyName", "logoLight");
    if (l?.value) logo = l.value;
  }
  return (
    <a href="about:blank" style={{ fontSize: "1.125rem", display: "block", marginTop: 20, marginBottom: 20 }} onClick={(e) => { e.preventDefault(); props.selectChurch(props.church.id) }}>
      <Row>
        <Col md={6}><img src={logo} alt="church logo" className="w-100 h-auto" /></Col>
        <Col md={6} className="m-auto">{props.church.name}</Col>
      </Row>
    </a>

  );
};
