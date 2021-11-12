"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenTimeoutError = exports.NotConnectedError = exports.CloseTimeoutError = exports.RequestTimeoutError = exports.ConnectionTimeoutError = exports.TimeoutError = void 0;
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = "Timeout."; }
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
var ConnectionTimeoutError = /** @class */ (function (_super) {
    __extends(ConnectionTimeoutError, _super);
    function ConnectionTimeoutError(message) {
        if (message === void 0) { message = "Connection timeout."; }
        return _super.call(this, message) || this;
    }
    return ConnectionTimeoutError;
}(TimeoutError));
exports.ConnectionTimeoutError = ConnectionTimeoutError;
var RequestTimeoutError = /** @class */ (function (_super) {
    __extends(RequestTimeoutError, _super);
    function RequestTimeoutError(message) {
        if (message === void 0) { message = "Request timeout."; }
        return _super.call(this, message) || this;
    }
    return RequestTimeoutError;
}(TimeoutError));
exports.RequestTimeoutError = RequestTimeoutError;
var CloseTimeoutError = /** @class */ (function (_super) {
    __extends(CloseTimeoutError, _super);
    function CloseTimeoutError(message) {
        if (message === void 0) { message = "Close timeout."; }
        return _super.call(this, message) || this;
    }
    return CloseTimeoutError;
}(TimeoutError));
exports.CloseTimeoutError = CloseTimeoutError;
var NotConnectedError = /** @class */ (function (_super) {
    __extends(NotConnectedError, _super);
    function NotConnectedError(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = "Not connected."; }
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return NotConnectedError;
}(Error));
exports.NotConnectedError = NotConnectedError;
var ListenTimeoutError = /** @class */ (function (_super) {
    __extends(ListenTimeoutError, _super);
    function ListenTimeoutError(message) {
        if (message === void 0) { message = "Listen timeout."; }
        return _super.call(this, message) || this;
    }
    return ListenTimeoutError;
}(TimeoutError));
exports.ListenTimeoutError = ListenTimeoutError;
//# sourceMappingURL=TimeoutError.js.map