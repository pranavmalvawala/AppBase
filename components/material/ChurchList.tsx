import React from "react";
import { ChurchInterface } from "../../interfaces";
import { NavItem } from "./NavItem";

export interface Props { churches: ChurchInterface[], currentChurch: ChurchInterface }

export const ChurchList: React.FC<Props> = props => {
  if (props.churches.length < 2) return <></>;
  else {
    let result: JSX.Element[] = [];
    const churches = props.churches.filter(c => c.apis.length > 0)
    churches.forEach(c => {
      const church = c;
      const churchName = (c.id === props.currentChurch.id) ? c.name + "*" : c.name;
      result.push(<NavItem url={"/" + church.id} label={churchName} icon="church" />);
    });
    return <>{result}</>;
  }
};
