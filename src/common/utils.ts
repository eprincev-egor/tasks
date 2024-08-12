import {v1 as uuidV1} from "uuid";

export type PickProperties<T> = {
    [P in keyof T as T[P] extends (...args: any[]) => any ? never : P]: T[P]
}

export function uuid() {
    return uuidV1({
        msecs: Date.now()
    });
}