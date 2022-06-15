import React from "react";
import { ApiHelper } from "../../helpers/ApiHelper";
import { UserHelper } from "../../helpers/UserHelper";
import { NavItem } from "./NavItem";

export const AppList: React.FC = () => {
  const jwt = ApiHelper.getConfig("AccessApi").jwt;
  const churchId = UserHelper.currentChurch.id;
  return (
    <>
      <NavItem url={`https://app.chums.org/login?jwt=${jwt}&churchId=${churchId}`} external={true} label="Chums" icon="logout" />
      <NavItem url={`https://streaminglive.church/login?jwt=${jwt}&churchId=${churchId}`} external={true} label="StreamingLive" icon="logout" />
      <NavItem url={`https://b1.church/login?jwt=${jwt}&churchId=${churchId}`} external={true} label="B1.Church" icon="logout" />
      <NavItem url={`https://lessons.church/login?jwt=${jwt}&churchId=${churchId}`} external={true} label="Lessons.church" icon="logout" />
    </>
  );
}
