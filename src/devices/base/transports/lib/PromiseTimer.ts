import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./TimeoutError"
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError }

export class PromiseTimer {
	public timeout = 5000
	
	public timer<T>(
		func: (resolve: (returnValue: T) => void, reject: (error: Error) => void) => void,
		{
			error = new TimeoutError(),
			timeout = this.timeout,
			callback = () => {},
		}: PromiseTimer.TimerOptions = {}
	): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const timeoutId = setTimeout(() => _reject(error), timeout)
			
			const _resolve = (returnValue: T): void => {
				clearTimeout(timeoutId)
				callback("resolve")
				resolve(returnValue)
			}
			
			const _reject = (error: Error): void => {
				clearTimeout(timeoutId)
				callback("reject")
				reject(error)
			}
			
			func(_resolve, _reject)
		})
	}
}

export namespace PromiseTimer {
	export type TimeoutOptions = {
		error?: TimeoutError
		timeout?: number
	}
	
	export type PromiseResult = "resolve" | "reject"
	export type TimerCallback = (result: PromiseResult) => void
	
	export interface TimerOptions extends TimeoutOptions {
		callback?: TimerCallback
	}
	
}
