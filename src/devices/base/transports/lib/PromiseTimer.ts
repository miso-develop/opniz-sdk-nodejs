import { AbortController } from "abortcontroller-polyfill/dist/cjs-ponyfill"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./TimeoutError"
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "./TimeoutError"

export type TimeoutOptions = Partial<{
	error: TimeoutError
	timeout: number
}>

type AbortableTimeoutOptions = TimeoutOptions & Partial<{ abortController: AbortController }>

export class PromiseTimer {
	public timeout = 5000
	
	public timer(promise: Promise<any>, {
		error = new TimeoutError(),
		timeout = this.timeout,
	}: TimeoutOptions = {}): Promise<any> {
		return this.timers([promise], { error, timeout })
	}
	
	public timers(promises: Promise<any>[], {
		error = new TimeoutError(),
		timeout = this.timeout,
	}: TimeoutOptions = {}): Promise<any> {
		const abortController = new AbortController()
		return Promise.race([
			...(promises.map((promise: Promise<any>) => this._abortable(promise, abortController))),
			this._causeTimeout({ error, timeout, abortController }),
		])
	}
	
	private _abortable(promise: Promise<any>, abortController: AbortController): Promise<any> {
		// MEMO: Promiseラップしない代替コードを考えたものの、エラー発生後にabort叩くにはこの形にしないとだめだった
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			try {
				resolve(await promise)
				abortController.abort()
			} catch (e) {
				reject(e)
				abortController.abort()
			}
		})
	}
	
	private _causeTimeout({
		error = new TimeoutError(),
		timeout = this.timeout,
		abortController = new AbortController(),
	}: AbortableTimeoutOptions): Promise<void> {
		return this._abortableSleep({ error, timeout, abortController })
	}
	
	private _abortableSleep({
		error = new TimeoutError(),
		timeout = this.timeout,
		abortController = new AbortController(),
	}: AbortableTimeoutOptions): Promise<void> {
		const { signal } = abortController
		return new Promise((resolve, reject) => {
			const onAbort = () => {
				clearTimeout(timeoutHandle)
				resolve()
			}
			
			const timeoutHandle = setTimeout(() => {
				signal?.removeEventListener("abort", onAbort)
				reject(error)
			}, timeout)
			
			signal?.addEventListener("abort", onAbort, { once: true })
		})
	}
}
