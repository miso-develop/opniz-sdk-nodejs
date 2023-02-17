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
exports.Esp32 = void 0;
/* eslint @typescript-eslint/no-inferrable-types: "off" */
const BaseDevice_1 = require("./base/BaseDevice");
class Esp32 extends BaseDevice_1.BaseDevice {
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_getVersion(void):String");
            return result === undefined ? undefined : result;
        });
    }
    getFreeHeap() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_esp_get_minimum_free_heap_size(void):uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    temperatureRead() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_temperatureRead():float");
            return result === undefined ? undefined : Number(result);
        });
    }
    restart() {
        return __awaiter(this, void 0, void 0, function* () {
            // MEMO: デバイスがrestartされるとレスポンスが返ってこずエラーとなるため、catchしてtrueを返す
            try {
                yield this.exec("_esp_restart(void):void");
            }
            catch (_a) {
                return true;
            }
        });
    }
    delay(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_delay(uint32_t):void", ms);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    analogRead(pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_analogRead(uint8_t):uint16_t", pin);
            return result === undefined ? undefined : Number(result);
        });
    }
    digitalRead(pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_digitalRead(uint8_t):int", pin);
            return result === undefined ? undefined : Number(result);
        });
    }
    digitalWrite(pin, val) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_digitalWrite(uint8_t,uint8_t):void", pin, val);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    ledcWrite(pin, duty, channel = 0, freq = 12800, resolutionBits = 8) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_ledcWrite(uint8_t,uint32_t):void", pin, duty, channel, freq, resolutionBits);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    pinMode(pin, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_pinMode(uint8_t,uint8_t):void", pin, mode);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    ledcSetup(chan, freq, bitNum) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_ledcSetup(uint8_t,uint32_t,uint8_t):uint32_t", chan, freq, bitNum);
            return result === undefined ? undefined : Number(result);
        });
    }
    ledcAttachPin(pin, chan) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_ledcAttachPin(uint8_t,uint8_t):void", pin, chan);
            return result === undefined ? undefined : Boolean(result);
        });
    }
}
exports.Esp32 = Esp32;
