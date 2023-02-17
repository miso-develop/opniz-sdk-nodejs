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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
class Button {
    constructor(opniz) {
        this.opniz = opniz;
        this.ButtonType = ButtonType;
        this.ButtonTypeList = ButtonTypeList;
        this.onClicked = () => { };
        this.onDeciedClickCount = () => { };
        this.onSingleClicked = () => { };
        this.onDoubleClicked = () => { };
        this.onHold = () => { };
        this.rpcHandlers = [
            {
                name: "_M5.Btn.wasClicked(void):bool",
                procedure: (params) => __awaiter(this, void 0, void 0, function* () {
                    const button = this._convertButtonType(params[0]);
                    const count = Number(params[1]);
                    yield this.onClicked(button, count);
                    return params ? JSON.stringify(params) : "true";
                }),
            }, {
                name: "_M5.Btn.wasDeciedClickCount(void):bool",
                procedure: (params) => __awaiter(this, void 0, void 0, function* () {
                    const button = this._convertButtonType(params[0]);
                    const count = Number(params[1]);
                    switch (count) {
                        case 1:
                            yield this.onSingleClicked(button);
                            break;
                        case 2:
                            yield this.onDoubleClicked(button);
                            break;
                        default: yield this.onDeciedClickCount(button, count);
                    }
                    return params ? JSON.stringify(params) : "true";
                }),
            }, {
                name: "_M5.Btn.wasHold(void):bool",
                procedure: (params) => __awaiter(this, void 0, void 0, function* () {
                    const button = this._convertButtonType(params[0]);
                    yield this.onHold(button);
                    return params ? JSON.stringify(params) : "true";
                }),
            },
        ];
    }
    _convertButtonType(bitStr) {
        const bit = Number(bitStr);
        return ButtonTypeList[bit];
    }
    setDebounceThresh(msec) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Btn.setDebounceThresh(uint32_t):void", msec);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setHoldThresh(msec) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Btn.setHoldThresh(uint32_t):void", msec);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getDebounceThresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Btn.getDebounceThresh(void):uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getHoldThresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Btn.getHoldThresh(void):uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
}
exports.Button = Button;
const ButtonType = {
    "BtnA": 1,
    "BtnB": 2,
    "BtnC": 4,
    "BtnPWR": 8,
    "BtnExt": 16,
};
const ButtonTypeList = Object.entries(ButtonType).reduce((obj, entry) => (Object.assign(Object.assign({}, obj), { [entry[1]]: entry[0] })), {});
