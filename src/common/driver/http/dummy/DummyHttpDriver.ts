import { HttpDriver } from "../interface";

export class DummyHttpDriver implements HttpDriver {

    put(): Promise<void> {
        throw new Error("not implemented");
    }

    patch(): Promise<void> {
        throw new Error("not implemented");
    }
}