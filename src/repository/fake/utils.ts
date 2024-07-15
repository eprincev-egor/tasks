/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function matchedFields(
    actualModel: Record<string, any>,
    expectedModel: Record<string, any>
) {
    return Object.keys(expectedModel).filter((key) => {
        const expectedValue = expectedModel[key];
        const actualValue = actualModel[key];
        return JSON.stringify(expectedValue) === JSON.stringify(actualValue);
    });
}

export type DeepPartial<T> = (
    T extends Array<infer U> ? Array<DeepPartial<U>> :
    T extends object ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    } : Partial<T>
);


export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shallowDeepEqual(expect: any, actual: any, path = ""): void {
    if ( isPrimitiveOrDate(expect) ) {
        shallowDeepEqualPrimitiveOrDate(expect, actual, path);
        return;
    }

    if ( Array.isArray(expect) ) {
        shallowDeepEqualArray(expect, actual as any[], path);
    }

    shallowDeepEqualObject(
        expect as Record<any, any>,
        actual as Record<any, any>,
        path
    );
}

function isPrimitiveOrDate(value: any): value is null | undefined | boolean | number | string | Date {
    return (
        value == null ||
        /boolean|number|string/.test(typeof value) ||
        value instanceof Date
    );
}

function shallowDeepEqualPrimitiveOrDate(expect: any, actual: any, path: string) {
    const isEqual = (
        actual === expect ||
        expect instanceof Date &&
        actual instanceof Date &&
        expect.getTime() == actual.getTime()
    );
    if ( !isEqual )
        throw new Error(`Expected to have: ${stringify(expect)}\nbut got: ${stringify(actual)}\nat path "${path}".`);
}

function shallowDeepEqualArray(
    expect: any[],
    actual: any[],
    path: string
) {
    if ( actual === null )
        throw new Error(`Expected to have an array/object, but got null at path "${path}".`);

    if ( actual.length < expect.length )
        throw new Error(`Expected to have ${expect.length} elements, but got array with ${actual.length} items at path "${path}".`);

    if ( expect.length === 0 && actual.length > 0 )
        throw new Error(`Expected to have empty array, but got array with ${actual.length} items at path "${path}".`);

    for (const [i, expectedElement] of expect.entries()) {
        shallowDeepEqual(expectedElement, actual[i], `${path}[${i}]`);
    }
}

function shallowDeepEqualObject(
    expect: Record<any, any>,
    actual: Record<any, any>,
    path: string
) {
    if ( actual === null )
        throw new Error(`Expected to have an array/object but got null at path "${path}".`);

    for (const key in expect) {
        if (actual[key] === undefined && expect[key] !== undefined)
            throw new Error(`Expected ${key.toString()} field to be defined at path "${path}".`);

        shallowDeepEqual(expect[key], actual[key], `${path}/${key}`);
    }
}

export function stringify(value: any) {
    if ( value instanceof Date ) {
        return `"${value.toISOString()}"`;
    }

    return JSON.stringify(value);
}