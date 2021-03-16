export type TimeoutOptions = Partial<{
	error: Error
	timeout: number
}>

export class TimeoutError extends Error {
	constructor(message = "timeout.") {
		super(message)
		this.name = new.target.name
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

export class PromiseTimer {
	public timeout: number = 5000
	
	public timer(func: Promise<any>, {
		error = new TimeoutError(),
		timeout = this.timeout,
	}: TimeoutOptions = {}): Promise<any> {
		return this.timers([func], { error, timeout })
	}
	
	public timers(functions: Promise<any>[], {
		error = new TimeoutError(),
		timeout = this.timeout,
	}: TimeoutOptions = {}): Promise<any> {
		return Promise.race([
			...functions,
			this._causeTimeout({ error, timeout }),
		])
	}
	
	private _causeTimeout({
		error = new TimeoutError(),
		timeout = this.timeout,
	}: TimeoutOptions): Promise<Error> {
		return new Promise((res, rej) => setTimeout(() => rej(error), timeout))
	}
}
