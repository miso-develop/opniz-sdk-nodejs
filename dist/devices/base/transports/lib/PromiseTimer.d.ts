import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./TimeoutError";
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError };
export declare class PromiseTimer {
    timeout: number;
    timer<T>(func: (resolve: (returnValue: T) => void, reject: (error: Error) => void) => void, { error, timeout, }?: PromiseTimer.TimeoutOptions): Promise<T>;
}
export declare namespace PromiseTimer {
    type TimeoutOptions = Partial<{
        error: TimeoutError;
        timeout: number;
    }>;
}
