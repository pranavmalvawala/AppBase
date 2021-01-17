import { ApiHelper } from './ApiHelper'
import { UserInterface, ChurchInterface, RolePermissionInterface } from "../interfaces/AccessManagement";
import { UserContextInterface } from '../interfaces';

export class UserHelper {
    static currentChurch: ChurchInterface;
    static churches: ChurchInterface[];
    static user: UserInterface;
    static currentPermissions: RolePermissionInterface[];
    static churchChanged: boolean = false;

    static selectChurch = async (churchId: number, context: UserContextInterface, apiName: string) => {
        console.log(apiName);
        var church = null;
        UserHelper.churches.forEach(c => { if (c.id === churchId) church = c; });
        if (church === null) window.location.reload();
        else {
            UserHelper.currentChurch = church;
            UserHelper.currentChurch.apis.forEach(api => {
                if (api.keyName === apiName) {
                    UserHelper.currentPermissions = api.permissions;
                    ApiHelper.jwt = api.jwt
                }
            });

            console.log(UserHelper.currentChurch.name);
            console.log(UserHelper.currentChurch.id.toString());

            if (context.churchName !== "") UserHelper.churchChanged = true;
            context.setChurchName(UserHelper.currentChurch.name);
        }
    }

    static checkAccess(contentType: string, action: string): boolean {
        var result = false;
        if (UserHelper.currentPermissions !== undefined) {
            UserHelper.currentPermissions.forEach(element => {
                if (element.contentType === contentType && element.action === action) result = true;
            });
        }
        return result;
    }

}

