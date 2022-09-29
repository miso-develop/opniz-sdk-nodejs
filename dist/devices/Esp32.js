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
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
class Esp32 extends BaseDevice_1.BaseDevice {
    getDeviceName() {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.exec("_getDeviceName():String")) || "");
        });
    }
    getFreeHeap() {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[getFreeHeap]")
            return Number((yield this.exec("getFreeHeap")) || -1);
        });
    }
    temperatureRead() {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[temperatureRead]")
            return Number((yield this.exec("temperatureRead")) || -1);
        });
    }
    restart() {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[restart]")
            // MEMO: デバイスがrestartされるとレスポンスが返ってこずエラーとなるため、catchしてtrueを返す
            try {
                return Boolean(yield this.exec("restart"));
            }
            catch (_a) {
                return true;
            }
        });
    }
    delay(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[delay]")
            return Boolean(yield this.exec("delay", ms));
        });
    }
    analogRead(pin) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[analogRead]")
            return Number((yield this.exec("analogRead", pin)) || -1);
        });
    }
    dacWrite(pin, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[dacWrite]")
            return Boolean(yield this.exec("dacWrite", pin, value));
        });
    }
    digitalRead(pin) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[digitalRead]")
            return Number((yield this.exec("digitalRead", pin)) || -1);
        });
    }
    digitalWrite(pin, val) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[digitalWrite]")
            return Boolean(yield this.exec("digitalWrite", pin, val));
        });
    }
    ledcWrite(pin, duty, channel = 0, freq = 12800, resolutionBits = 8) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[ledcWrite]")
            return Boolean(yield this.exec("ledcWrite", pin, duty, channel, freq, resolutionBits));
        });
    }
}
exports.Esp32 = Esp32;
