export abstract class AbstractDomainError extends Error {
    abstract code: string;
}