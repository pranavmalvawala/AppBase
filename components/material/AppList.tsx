import React from "react";
import { NavItem } from "./NavItem";

export interface Props {
}

export const AppList: React.FC<Props> = props => {
  const getAppLinks = () => {
    let result: JSX.Element[] = [];
    result.push(<NavItem url="https://chums.org/" target="_new" label="Chums" icon="logout" />);
    result.push(<NavItem url="https://streaminglive.church/" target="_new" label="StreamingLive" icon="logout" />);
    result.push(<NavItem url="https://b1.church/" target="_new" label="B1.Church" icon="logout" />);
    result.push(<NavItem url="https://lessons.church/" target="_new" label="Lessons.church" icon="logout" />);
    return result;
  }

  return (
    <>
      {getAppLinks()}
    </>
  );
};
