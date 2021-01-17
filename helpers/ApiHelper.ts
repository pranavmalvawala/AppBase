export class ApiHelper {
    static jwt = '';
    static apiBase = '';

    static getUrl(path: string) {
        if (path.indexOf("://") > -1) return path;
        else return ApiHelper.apiBase + path;
    }

    static async apiGet(path: string) {
        try {
            const requestOptions = { method: 'GET', headers: { 'Authorization': 'Bearer ' + this.jwt } };
            return fetch(this.getUrl(path), requestOptions).then(response => response.json())
        } catch (e) {
            throw (e);
        }
    }

    static async appApiPost(jwt: string, path: string, data: any[] | {}) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + jwt, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(path, requestOptions).then(response => response.json())
    }

    static async apiPost(path: string, data: any[] | {}) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.jwt, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(this.getUrl(path), requestOptions).then(response => response.json())
    }

    static async apiDelete(path: string) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + this.jwt }
        };
        return fetch(this.getUrl(path), requestOptions);
    }

    static async apiPostAnonymous(path: string, data: any[] | {}) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(this.getUrl(path), requestOptions).then(response => response.json())
    }

}
