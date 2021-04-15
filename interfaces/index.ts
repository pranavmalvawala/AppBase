export * from "./UserContextInterface";
export * from "./Permissions";

// API interfaces
export * from "./Access";
export * from './Membership';
export * from './Donation'
export * from "./Attendance"

export enum ApiName {
    ACCESS_API = "AccessApi",
    ATTENDANCE_API = "AttendanceApi",
    GIVING_API = "GivingApi",
    MEMBERSHIP_API = "MembershipApi"
}
