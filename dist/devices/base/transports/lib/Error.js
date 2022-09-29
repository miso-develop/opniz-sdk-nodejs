"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedConnectError = exports.ListenTimeoutError = exports.NotConnectedError = exports.CloseTimeoutError = exports.RequestTimeoutError = exports.ConnectionTimeoutError = exports.TimeoutError = void 0;
class TimeoutError extends Error {
    constructor(message = "Timeout.") {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.TimeoutError = TimeoutError;
class ConnectionTimeoutError extends TimeoutError {
    constructor(message = "Connection timeout.") {
        super(message);
    }
}
exports.ConnectionTimeoutError = ConnectionTimeoutError;
class RequestTimeoutError extends TimeoutError {
    constructor(message = "Request timeout.") {
        super(message);
    }
}
exports.RequestTimeoutError = RequestTimeoutError;
class CloseTimeoutError extends TimeoutError {
    constructor(message = "Close timeout.") {
        super(message);
    }
}
exports.CloseTimeoutError = CloseTimeoutError;
class NotConnectedError extends Error {
    constructor(message = "Not connected.") {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NotConnectedError = NotConnectedError;
class ListenTimeoutError extends TimeoutError {
    constructor(message = "Listen timeout.") {
        super(message);
    }
}
exports.ListenTimeoutError = ListenTimeoutError;
class NotImplementedConnectError extends TimeoutError {
    constructor(message = "connect() is not implemented.") {
        super(message);
    }
}
exports.NotImplementedConnectError = NotImplementedConnectError;
