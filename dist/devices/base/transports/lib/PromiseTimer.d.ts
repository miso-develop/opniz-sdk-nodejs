import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./Error";
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError };
export declare class PromiseTimer {
    timeout: number;
    timer<T>(func: (resolve: (returnValue: T) => void, reject: (error: Error) => void) => void, { error, timeout, callback, }?: PromiseTimer.TimerOptions): Promise<T>;
}
export declare namespace PromiseTimer {
    type TimeoutOptions = {
        error?: TimeoutError;
        timeout?: number;
    };
    type PromiseResult = "resolve" | "reject";
    type TimerCallback = (result: PromiseResult) => void;
    interface TimerOptions extends TimeoutOptions {
        callback?: TimerCallback;
    }
}
