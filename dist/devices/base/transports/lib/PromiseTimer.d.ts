import { TimeoutError } from "./TimeoutError";
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./TimeoutError";
export declare type TimeoutOptions = Partial<{
    error: TimeoutError;
    timeout: number;
}>;
export declare class PromiseTimer {
    timeout: number;
    timer(promise: Promise<any>, { error, timeout, }?: TimeoutOptions): Promise<any>;
    timers(promises: Promise<any>[], { error, timeout, }?: TimeoutOptions): Promise<any>;
    private _abortable;
    private _causeTimeout;
    private _abortableSleep;
}
//# sourceMappingURL=PromiseTimer.d.ts.map