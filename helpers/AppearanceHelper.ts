import { ApiHelper } from "./ApiHelper"

export interface AppearanceInterface { primaryColor?: string, primaryContrast?: string, secondaryColor?: string, secondaryContrast?: string, logoSquare?: string, logoHeader?: string }

export class AppearanceHelper {

    static current: AppearanceInterface;

    public static async load(churchId: string) {
        if (!AppearanceHelper.current) AppearanceHelper.current = await ApiHelper.getAnonymous("/settings/public/" + churchId, "AccessApi");
        return this.current;
    }

    public static getLogoSquare(appearanceSettings: AppearanceInterface, defaultLogo: string) {
        return (appearanceSettings?.logoSquare) ? appearanceSettings.logoSquare : defaultLogo;
    }

    public static getLogoHeader(appearanceSettings: AppearanceInterface, defaultLogo: string) {
        return (appearanceSettings?.logoHeader) ? appearanceSettings.logoHeader : defaultLogo;
    }

}