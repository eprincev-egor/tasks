export interface HttpDriver {
    put(url: string, body: any): Promise<void>;
    patch(url: string, body: any): Promise<void>;
}