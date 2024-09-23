import { HttpDriver } from "../interface";

export class BrowserFetchHttpDriver
implements HttpDriver {

    async put(url: string, body: any): Promise<void> {
        await this.fetch("PUT", url, body);
    }

    async patch(url: string, body: any): Promise<void> {
        await this.fetch("PATCH", url, body);
    }

    private async fetch(method: string, url: string, body: any) {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }
}