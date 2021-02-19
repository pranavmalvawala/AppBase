export class UniqueIdHelper {

    public static isMissing(obj: any) {
        if (obj === undefined || obj === null) return true;
        else if (obj.toString() === "") return true;
        else return false;
    }
}