import React from "react";
import { ChurchInterface } from "../../interfaces";
import { Modal } from "react-bootstrap";
import { SelectChurchSearch } from "./SelectChurchSearch";
import { SelectableChurch } from "./SelectableChurch";

interface Props {
  show: boolean,
  churches?: ChurchInterface[],
  selectChurch: (churchId: string) => void,
  registeredChurchCallback?: (church: ChurchInterface) => void
}

export const SelectChurchModal: React.FC<Props> = (props) => {
  const [showSearch, setShowSearch] = React.useState(false);

  const getContents = () => {
    if (showSearch) return <SelectChurchSearch selectChurch={props.selectChurch} registeredChurchCallback={props.registeredChurchCallback} />
    else return (<>
      {props.churches?.map(c => (<SelectableChurch church={c} selectChurch={props.selectChurch} />))}
      <a href="#" style={{ color: "#999", display: "block", textAlign: "center" }} onClick={(e) => { e.preventDefault(); setShowSearch(true); }} >Choose another church</a>
    </>);
  }

  return (
    <Modal show={props.show} backdrop="static" keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title>Select Church</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {getContents()}

      </Modal.Body>
    </Modal>
  );
};
