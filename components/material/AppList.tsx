import React from "react";
import { ApiHelper } from "../../helpers/ApiHelper";
import { UserHelper } from "../../helpers/UserHelper";
import { NavItem } from "./NavItem";

export interface Props { appName: string }

export const AppList: React.FC<Props> = props => {
  const jwt = ApiHelper.getConfig("AccessApi").jwt;
  const churchId = UserHelper.currentChurch.id;
  return (
    <>
      <NavItem url={`https://app.chums.org/login?jwt=${jwt}&churchId=${churchId}`} selected={props.appName === "Chums"} external={true} label="Chums" icon="logout" />
      <NavItem url={`https://streaminglive.church/login?jwt=${jwt}&churchId=${churchId}`} selected={props.appName === "StreamingLive"} external={true} label="StreamingLive" icon="logout" />
      <NavItem url={`https://b1.church/login?jwt=${jwt}&churchId=${churchId}`} selected={props.appName === "B1.church"} external={true} label="B1.Church" icon="logout" />
      <NavItem url={`https://lessons.church/login?jwt=${jwt}&churchId=${churchId}`} selected={props.appName === "Lessons.church"} external={true} label="Lessons.church" icon="logout" />
    </>
  );
}
