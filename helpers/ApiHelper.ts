import { ApiConfig } from "../interfaces";

export class ApiHelper {

    static apiConfigs: ApiConfig[] = [];
    static defaultApi = "";
    static isAuthenticated = false;

    static getConfig(keyName: string) {
        if (keyName === undefined) keyName = this.defaultApi;
        var result: ApiConfig = null;
        this.apiConfigs.forEach(config => { if (config.keyName === keyName) result = config });
        if (result === null) throw new Error("Unconfigured API: " + keyName);
        return result;
    }

    static setJwt(keyName: string, jwt: string) {
        this.apiConfigs.forEach(config => { if (config.keyName === keyName) config.jwt = jwt; });
        this.isAuthenticated = true;
    }

    static clearJwts() {
        this.apiConfigs.forEach(config => { config.jwt = ""; });
        this.isAuthenticated = false;
    }

    static async get(path: string, apiName?: string) {
        const config = this.getConfig(apiName);
        try {
            const requestOptions = { method: 'GET', headers: { 'Authorization': 'Bearer ' + config.jwt } };
            return fetch(config.url + path, requestOptions).then(response => response.json())
        } catch (e) {
            throw (e);
        }
    }

    static async post(path: string, data: any[] | {}, apiName?: string) {
        const config = this.getConfig(apiName);
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + config.jwt, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(config.url + path, requestOptions).then(response => response.json())
    }

    static async delete(path: string, apiName?: string) {
        const config = this.getConfig(apiName);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + config.jwt }
        };
        return fetch(config.url + path, requestOptions);
    }

    static async postAnonymous(path: string, data: any[] | {}, apiName?: string) {
        const config = this.getConfig(apiName);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(config.url + path, requestOptions).then(response => response.json())
    }

}
