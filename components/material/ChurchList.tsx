import React from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../../UserContext";
import { UserHelper } from "../../helpers/UserHelper";
import { ChurchInterface } from "../../interfaces";
import { NavItem } from "./NavItem";

export interface Props { churches: ChurchInterface[], currentChurch: ChurchInterface }

export const ChurchList: React.FC<Props> = props => {
  const location = useLocation();
  const context = React.useContext(UserContext);

  if (props.churches.length < 2) return <></>;
  else {
    let result: JSX.Element[] = [];
    const churches = props.churches.filter(c => c.apis.length > 0)
    churches.forEach(c => {
      const church = c;
      const churchName = c.name;
      result.push(<NavItem url={location.pathname} selected={(c.id === props.currentChurch.id) && true} onClick={() => UserHelper.selectChurch(context, church.id, null)} label={churchName} icon="church" />);
    });
    return <>{result}</>;
  }
};
