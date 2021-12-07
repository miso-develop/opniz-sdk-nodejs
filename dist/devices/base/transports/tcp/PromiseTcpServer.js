"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTcpServer = void 0;
const events_1 = require("events");
const net_1 = __importDefault(require("net"));
// const dbg = (...v) => console.log(chalk.black.bgCyan(getDateStr(), "[PromiseTcpServer]", ...v)) // DEBUG:
class PromiseTcpServer extends events_1.EventEmitter {
    constructor(port) {
        super();
        this.onerror = (error) => { };
        this.ondata = (data) => __awaiter(this, void 0, void 0, function* () { return data.toString(); });
        this.port = port;
        this._listen(this.port);
    }
    _listen(port) {
        this.server = net_1.default.createServer(socket => {
            this.socket = socket;
            this.socket.on("data", (data) => __awaiter(this, void 0, void 0, function* () { return socket.write(yield this.ondata(data)); }));
            this.socket.on("error", this.onerror);
        });
        this.server.on("error", this.onerror);
        this.server.listen(port);
    }
}
exports.PromiseTcpServer = PromiseTcpServer;
