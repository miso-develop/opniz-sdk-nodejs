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
exports.TransportCreator = exports.ConstructorParameterError = void 0;
var Transport_1 = require("./Transport");
var TcpTransport_1 = require("./tcp/TcpTransport");
var WebSocketServerTransport_1 = require("./webSocket/WebSocketServerTransport");
var WebSocketClientTransport_1 = require("./webSocket/WebSocketClientTransport");
var ConstructorParameterError = /** @class */ (function (_super) {
    __extends(ConstructorParameterError, _super);
    function ConstructorParameterError(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = "Constructor parameter invalid."; }
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ConstructorParameterError;
}(Error));
exports.ConstructorParameterError = ConstructorParameterError;
var TransportCreator = /** @class */ (function () {
    function TransportCreator() {
    }
    TransportCreator.create = function (_a) {
        var address = _a.address, port = _a.port, serverPort = _a.serverPort, _b = _a.protocol, protocol = _b === void 0 ? Transport_1.Protocol.WebSocketServer : _b;
        switch (protocol) {
            case Transport_1.Protocol.WebSocketServer:
                return new WebSocketServerTransport_1.WebSocketServerTransport({ port: port });
            case Transport_1.Protocol.WebSocketClient:
                if (!address)
                    throw new ConstructorParameterError();
                return new WebSocketClientTransport_1.WebSocketClientTransport({ address: address, port: port });
            case Transport_1.Protocol.TCP:
                if (!address)
                    throw new ConstructorParameterError();
                return new TcpTransport_1.TcpTransport({ address: address, port: port, serverPort: serverPort });
            default:
                return new WebSocketServerTransport_1.WebSocketServerTransport({ port: port });
        }
    };
    return TransportCreator;
}());
exports.TransportCreator = TransportCreator;
//# sourceMappingURL=TransportCreator.js.map