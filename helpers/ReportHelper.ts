import { ArrayHelper } from "../../helpers";
import { ReportHeadingInterface } from "../interfaces/ReportInterfaces";


export class ReportHelper {

    static getRows(data: any, headings: ReportHeadingInterface[], groupings: string[]) {
        const result: any[] = [];

        if (groupings.length < 2) {
            const heading = ArrayHelper.getOne(headings, "field", groupings[0]);
            const valHeading = headings[headings.length - 1];
            data.forEach((d: any) => {
                const row: any[] = [];
                row.push(d[heading.field]);
                row.push(d[valHeading.field]);
                result.push(row);
            });

        } else {
            data.forEach((d: any) => {
                this.getChildRows(d, headings).forEach(r => result.push(r));
            });
        }
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