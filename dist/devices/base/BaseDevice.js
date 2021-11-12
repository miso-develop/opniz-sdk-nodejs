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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDevice = exports.Protocol = void 0;
var BaseRpcHandler_1 = require("./BaseRpcHandler");
var utils = __importStar(require("../../utils"));
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:
var BaseRpcHandler_2 = require("./BaseRpcHandler");
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return BaseRpcHandler_2.Protocol; } });
var BaseDevice = /** @class */ (function (_super) {
    __extends(BaseDevice, _super);
    function BaseDevice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // utils
        _this.utils = utils;
        _this.sleep = utils.sleep;
        _this.wait = utils.wait;
        return _this;
    }
    BaseDevice.prototype.requestRpc = function (rpcRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var rpcRequestString, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        rpcRequestString = JSON.stringify(Array.isArray(rpcRequest) ? rpcRequest : [rpcRequest]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.request(rpcRequestString)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    BaseDevice.prototype.sendRpc = function (rpcRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var rpcRequestString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rpcRequestString = JSON.stringify(Array.isArray(rpcRequest) ? rpcRequest : [rpcRequest]);
                        return [4 /*yield*/, this.send(rpcRequestString)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseDevice.prototype.exec = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var rpcRequest, rpcResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rpcRequest = this.createRpcRequest.apply(this, __spreadArray([method], params));
                        return [4 /*yield*/, this.requestRpc(rpcRequest)];
                    case 1:
                        rpcResponse = (_a.sent())[0];
                        return [2 /*return*/, rpcResponse !== "notmatch" ? rpcResponse : undefined];
                }
            });
        });
    };
    BaseDevice.prototype.execs = function (rpcs) {
        return __awaiter(this, void 0, void 0, function () {
            var rpcRequests, rpcResponses;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rpcRequests = rpcs.map(function (rpc) { return _this.createRpcRequest.apply(_this, __spreadArray([rpc.shift()], rpc)); });
                        return [4 /*yield*/, this.requestRpc(rpcRequests)];
                    case 1:
                        rpcResponses = (_a.sent()).map(function (rpcResponse) { return rpcResponse !== "notmatch" ? rpcResponse : undefined; });
                        return [2 /*return*/, rpcResponses];
                }
            });
        });
    };
    BaseDevice.prototype.createRpcRequest = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // dbg("[createRpc]")
        return { method: method, params: params };
    };
    return BaseDevice;
}(BaseRpcHandler_1.BaseRpcHandler));
exports.BaseDevice = BaseDevice;
//# sourceMappingURL=BaseDevice.js.map