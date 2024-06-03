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

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}