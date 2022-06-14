import React from "react";
import { NavItem } from "./NavItem";

export const AppList: React.FC = () => (
  <>
    <NavItem url="https://app.chums.org/login" external={true} label="Chums" icon="logout" />
    <NavItem url="https://streaminglive.church/login" external={true} label="StreamingLive" icon="logout" />
    <NavItem url="https://b1.church/login" external={true} label="B1.Church" icon="logout" />
    <NavItem url="https://lessons.church/login" external={true} label="Lessons.church" icon="logout" />
  </>
);
