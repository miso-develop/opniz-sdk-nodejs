export declare class TimeoutError extends Error {
    constructor(message?: string);
}
export declare class ConnectionTimeoutError extends TimeoutError {
    constructor(message?: string);
}
export declare class RequestTimeoutError extends TimeoutError {
    constructor(message?: string);
}
export declare class CloseTimeoutError extends TimeoutError {
    constructor(message?: string);
}
export declare class NotConnectedError extends Error {
    constructor(message?: string);
}
export declare class ListenTimeoutError extends TimeoutError {
    constructor(message?: string);
}
//# sourceMappingURL=TimeoutError.d.ts.map