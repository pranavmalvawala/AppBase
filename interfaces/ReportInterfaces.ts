export interface ReportHeadingInterface { name: string, field: string }
export interface ReportInterface { title: string, keyName: string, reportType: string, headings: ReportHeadingInterface[], data: any[] }
