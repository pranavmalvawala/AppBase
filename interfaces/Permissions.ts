import { IPermission } from "./";

interface AttendancePermissions {
  attendance: {
    view: IPermission;
  };
}

interface MembershipPermissions {
  forms: {
    view: IPermission;
  };
}

export class Permissions {
  static attendanceApi: AttendancePermissions = {
    attendance: {
      view: { api: "AttendanceApi", contentType: "Attendance", action: "View" },
    },
  };

  static membershipApi: MembershipPermissions = {
    forms: {
      view: { api: "MembershipApi", contentType: "Forms", action: "View" },
    },
  };
}
