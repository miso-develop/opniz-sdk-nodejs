import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./TimeoutError"
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError }

export class PromiseTimer {
	public timeout = 5000
	
	public timer<T>(
		func: (resolve: (returnValue: T) => void, reject: (error: Error) => void) => void,
		{
			error = new TimeoutError(),
			timeout = this.timeout,
		}: PromiseTimer.TimeoutOptions = {}
	): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const timeoutId = setTimeout(() => _reject(error), timeout)
			
			const _resolve = (returnValue: T): void => {
				clearTimeout(timeoutId)
				resolve(returnValue)
			}
			
			const _reject = (error: Error): void => {
				clearTimeout(timeoutId)
				reject(error)
			}
			
			func(_resolve, _reject)
		})
	}
}

export namespace PromiseTimer {
	export type TimeoutOptions = Partial<{
		error: TimeoutError
		timeout: number
	}>
}
