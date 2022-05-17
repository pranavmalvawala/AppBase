import React from "react";
import { Row, Col } from "react-bootstrap";
import { ArrayHelper } from "../../helpers"
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
    <Row>
      <Col md={6}>
        <a href="about:blank" style={{ fontSize: "1.125rem", display: "block", marginTop: 20, marginBottom: 20 }} onClick={(e) => { e.preventDefault(); props.selectChurch(props.church.id) }}>
          <img src={logo} alt="church logo" className="w-100 h-auto" />
        </a>
      </Col>
      <Col md={6} className="m-auto">
        <Row>
          <div>
            <a href="about:blank" style={{ fontSize: "1.125rem", display: "block" }} onClick={(e) => { e.preventDefault(); props.selectChurch(props.church.id) }}>{props.church.name}</a>
            {(props.church.address1 || props.church.city) && <div>
              {props.church.address1 ? (props.church.address1 + ", ") : ""}
              {props.church.city && props.church.city}
            </div>}
            {(props.church.address1 || props.church.city) && <div>
              {props.church.state ? (props.church.state + " ") : ""}
              {props.church.zip && props.church.zip}
            </div>}
          </div>
        </Row>
      </Col>
      <span style={{ display: "block", width: "100%", borderTop: "1px solid #ccc", margin: "1rem" }}></span>
    </Row>
  );
};
