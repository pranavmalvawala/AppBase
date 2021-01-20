import { ReportHeadingInterface } from "../interfaces/ReportInterfaces";


export class ReportHelper {

    static getRows(data: any, headings: ReportHeadingInterface[]) {
        const result: any[] = [];
        data.forEach((d: any) => {
            if (d.details === undefined) {
                const row: any[] = [];
                headings.forEach(h => { row.push(d[h.field]) });
                result.push(row);
            } else this.getChildRows(d, headings).forEach(r => result.push(r));
        });
        return result;
    }

    private static getChildRows(item: any, headings: ReportHeadingInterface[]) {
        const result: any[] = [];
        item.details.forEach((detail: any) => {
            const row: any[] = [];
            headings.forEach(h => {
                console.log(h);
                const field = h.field;
                if (field.indexOf("details.") === -1) row.push(item[field]);
                else row.push(detail[field.replace("details.", "")]);
            });
            result.push(row);
        });
        return result;
    }


}