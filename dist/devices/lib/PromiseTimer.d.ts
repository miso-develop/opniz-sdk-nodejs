export declare type TimeoutOptions = Partial<{
    error: Error;
    timeout: number;
}>;
export declare class TimeoutError extends Error {
    constructor(message?: string);
}
export declare class PromiseTimer {
    timeout: number;
    timer(func: Promise<any>, { error, timeout, }?: TimeoutOptions): Promise<any>;
    timers(functions: Promise<any>[], { error, timeout, }?: TimeoutOptions): Promise<any>;
    private _causeTimeout;
}
