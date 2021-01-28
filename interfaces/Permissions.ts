export class Permissions {
  static attendanceApi = {
    attendance: {
      view: { api: "AttendanceApi", contentType: "Attendance", action: "View" },
      view_summary: { api: "AttendanceApi", contentType: "Attendance", action: "View Summary" },
      edit: { api: "AttendanceApi", contentType: "Attendance", action: "Edit" }
    },
    services: {
      edit: { api: "AttendanceApi", contentType: "Services", action: "Edit" }
    },
    admin: {
      edit_settings: { api: "AttendanceApi", contentType: "Admin", action: "Edit Settings" }
    }
  };

  static membershipApi = {
    forms: {
      view: { api: "MembershipApi", contentType: "Forms", action: "View" },
      edit: { api: "MembershipApi", contentType: "Forms", action: "Edit" }
    },
    groups: {
      view: { api: "MembershipApi", contentType: "Groups", action: "View" },
      edit: { api: "MembershipApi", contentType: "Groups", action: "Edit" }
    },
    people: {
      edit_notes: { api: "MembershipApi", contentType: "People", action: "Edit Notes" },
      view_notes: { api: "MembershipApi", contentType: "People", action: "View Notes" },
      edit: { api: "MembershipApi", contentType: "People", action: "Edit" }
    },
    group_members: {
      edit: { api: "MembershipApi", contentType: "Group Members", action: "Edit" },
      view: { api: "MembershipApi", contentType: "Group Members", action: "View" }
    },
    households: {
      edit: { api: "MembershipApi", contentType: "Households", action: "Edit" }
    }
  };

  static givingApi = {
    donations: {
      view_summary: { api: "GivingApi", contentType: "Donations", action: "View Summary" },
      view: { api: "GivingApi", contentType: "Donations", action: "View" },
      edit: { api: "GivingApi", contentType: "Donations", action: "Edit" }
    }
  }

  static accessApi = {
    roles: {
      view: { api: "AccessApi", contentType: "Roles", action: "View" },
      edit: { api: "AccessApi", contentType: "Roles", action: "Edit" }
    },
    role_members: {
      view: { api: "AccessApi", contentType: "RoleMembers", action: "View" },
      edit: { api: "AccessApi", contentType: "RoleMembers", action: "Edit" }
    },
    role_permissions: {
      view: { api: "AccessApi", contentType: "RolePermissions", action: "View" },
      edit: { api: "AccessApi", contentType: "RolePermissions", action: "Edit" }
    },
    users: {
      view: { api: "AccessApi", contentType: "Users", action: "View" },
      edit: { api: "AccessApi", contentType: "Users", action: "Edit" }
    },
    settings: {
      edit: { api: "AccessApi", contentType: "Settings", action: "Edit" }
    }
  }
}
