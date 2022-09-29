export class TimeoutError extends Error {
	constructor(message = "Timeout.") {
		super(message)
		this.name = new.target.name
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

export class ConnectionTimeoutError extends TimeoutError {
	constructor(message = "Connection timeout.") {
		super(message)
	}
}

export class RequestTimeoutError extends TimeoutError {
	constructor(message = "Request timeout.") {
		super(message)
	}
}

export class CloseTimeoutError extends TimeoutError {
	constructor(message = "Close timeout.") {
		super(message)
	}
}

export class NotConnectedError extends Error {
	constructor(message = "Not connected.") {
		super(message)
		this.name = new.target.name
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

export class ListenTimeoutError extends TimeoutError {
	constructor(message = "Listen timeout.") {
		super(message)
	}
}

export class NotImplementedConnectError extends TimeoutError {
	constructor(message = "connect() is not implemented.") {
		super(message)
	}
}
