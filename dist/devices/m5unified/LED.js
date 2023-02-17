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
exports.LED = void 0;
class LED {
    constructor(opniz) {
        this.opniz = opniz;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_led.init():void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setBrightness(brightness) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_led.setBrightness(uint8_t):void", brightness);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    drawpix(xposOrNumber, yposOrColor, ColorOrUndefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ColorOrUndefined === undefined) {
                const Number = xposOrNumber;
                let Color = yposOrColor;
                if (typeof Color === "string")
                    Color = parseInt(Color.replace("#", ""), 16);
                const result = yield this.opniz.exec("_led.drawpix(uint8_t,uint8_t|CRGB,CRGB|undefined):void", Number, Color);
                return result === undefined ? undefined : Boolean(result);
            }
            else {
                const xpos = xposOrNumber;
                const ypos = yposOrColor;
                let Color = ColorOrUndefined;
                if (typeof Color === "string")
                    Color = parseInt(Color.replace("#", ""), 16);
                const result = yield this.opniz.exec("_led.drawpix(uint8_t,uint8_t|CRGB,CRGB|undefined):void", xpos, ypos, Color);
                return result === undefined ? undefined : Boolean(result);
            }
        });
    }
    fillpix(Color) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof Color === "string")
                Color = parseInt(Color.replace("#", ""), 16);
            const result = yield this.opniz.exec("_led.fillpix(CRGB):void", Color);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_led.clear():void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setWidthHeight(xColumns, yRows) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_led.setWidthHeight(uint16_t,uint16_t):void", xColumns, yRows);
            return result === undefined ? undefined : Boolean(result);
        });
    }
}
exports.LED = LED;
