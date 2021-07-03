import { format as dateFormat } from "date-fns"

export class DateHelper {

  static addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days);
    return date;
  }

  static formatDate(date: Date, format: string) {
    try {
      let cleanDate = new Date(new Date(date).toISOString().split("T")[0]); //truncate the time
      return dateFormat(cleanDate, format);
    } catch { return ""; }
  }

  static formatDateTime(date: Date, format: string) {
    try {
      return dateFormat(date, format);
    } catch { return ""; }
  }

  static prettyDate(date: Date) {
    if (date === undefined || date === null) return "";
    return this.formatDate(date, "MMM d, yyyy");
  }

  static prettyDateTime(date: Date) {
    if (date === undefined || date === null) return "";
    return this.formatDateTime(date, "MMM d, yyyy h:mm a");
  }

  static getLastSunday() {
    let result = new Date();
    while (result.getDay() !== 0) result.setDate(result.getDate() - 1);
    return result;
  }

  static getWeekSunday(year: number, week: number) {
    let result = new Date(year, 0, 1);
    while (result.getDay() !== 0) result.setDate(result.getDate() + 1);
    result.setDate(result.getDate() + ((week - 1) * 7));
    return result;
  }

  static formatHtml5Date(date: Date): string {
    let result = "";
    if (date !== undefined && date !== null) {
      try {
        result = new Date(date).toISOString().split("T")[0];
      } catch { }
    }
    return result;
  }

  static formatHtml5DateTime(date: Date): string {
    if (date === undefined || date === null) return "";
    else {
      return this.formatDateTime(date, "yyyy-MM-dd") + "T" + this.formatDateTime(date, "HH:mm");
    }
  }

  static getDisplayDuration(d: Date): string {
    let seconds = Math.round((new Date().getTime() - d.getTime()) / 1000);
    if (seconds > 86400) {
      let days = Math.floor(seconds / 86400);
      return (days === 1) ? "1 day" : days.toString() + " days";
    }
    else if (seconds > 3600) {
      let hours = Math.floor(seconds / 3600);
      return (hours === 1) ? "1 hour" : hours.toString() + " hours";
    }
    else if (seconds > 60) {
      let minutes = Math.floor(seconds / 60);
      return (minutes === 1) ? "1 minute" : minutes.toString() + " minutes";
    }
    else return (seconds === 1) ? "1 second" : Math.floor(seconds).toString() + " seconds";
  }

  static getShortDate(d: Date): string {
    return (d.getMonth() + 1).toString() + "/" + (d.getDate() + 1).toString() + "/" + d.getFullYear().toString();
  }
}
