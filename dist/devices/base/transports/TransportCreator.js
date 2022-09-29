"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportCreator = exports.ConstructorParameterError = void 0;
const Transport_1 = require("./Transport");
const TcpTransport_1 = require("./tcp/TcpTransport");
const WebSocketServerTransport_1 = require("./webSocket/WebSocketServerTransport");
const WebSocketClientTransport_1 = require("./webSocket/WebSocketClientTransport");
class ConstructorParameterError extends Error {
    constructor(message = "Constructor parameter invalid.") {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ConstructorParameterError = ConstructorParameterError;
class TransportCreator {
    // @ts-ignore TODO:
    static _defaultProtocol({ address, port, id, serverPort }) {
        if (id !== "___default___" && serverPort !== port)
            throw new ConstructorParameterError();
        if (id !== "___default___")
            return Transport_1.Protocol.WebSocketClient;
        if (serverPort !== port)
            return Transport_1.Protocol.TCP;
        return Transport_1.Protocol.WebSocketServer;
    }
    // @ts-ignore TODO:
    static create({ address, port, id = "___default___", serverPort = port, protocol = this._defaultProtocol({ address, port, id, serverPort }) }) {
        switch (protocol) {
            default:
                return new WebSocketServerTransport_1.WebSocketServerTransport({ port });
            case Transport_1.Protocol.WebSocketServer:
                return new WebSocketServerTransport_1.WebSocketServerTransport({ port });
            case Transport_1.Protocol.WebSocketClient:
                if (!address)
                    throw new ConstructorParameterError();
                return new WebSocketClientTransport_1.WebSocketClientTransport({ address, port, id });
            case Transport_1.Protocol.TCP:
                if (!address)
                    throw new ConstructorParameterError();
                return new TcpTransport_1.TcpTransport({ address, port, serverPort });
        }
    }
}
exports.TransportCreator = TransportCreator;
