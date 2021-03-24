"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Esp32 = void 0;
const BaseDevice_1 = require("./BaseDevice");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
class Esp32 extends BaseDevice_1.BaseDevice {
    constructor() {
        super(...arguments);
        this._name = "esp32";
    }
    addDeviceMessageHandlers(messageHandlers) { }
    async getFreeHeap() {
        // dbg("[getFreeHeap]")
        return Number(await this.exec("getFreeHeap"));
    }
    async temperatureRead() {
        // dbg("[temperatureRead]")
        return Number(await this.exec("temperatureRead"));
    }
    async restart() {
        // dbg("[restart]")
        return Boolean(await this.exec("restart"));
    }
    async delay(ms) {
        // dbg("[delay]")
        return Boolean(await this.exec("delay", ms));
    }
    async analogRead(pin) {
        // dbg("[analogRead]")
        return Number(await this.exec("analogRead", pin));
    }
    async dacWrite(pin, value) {
        // dbg("[dacWrite]")
        return Boolean(await this.exec("dacWrite", pin, value));
    }
    async digitalRead(pin) {
        // dbg("[digitalRead]")
        return Number(await this.exec("digitalRead", pin));
    }
    async digitalWrite(pin, val) {
        // dbg("[digitalWrite]")
        return Boolean(await this.exec("digitalWrite", pin, val));
    }
    async ledcWrite(pin, duty, channel = 0, freq = 12800, resolutionBits = 8) {
        // dbg("[ledcWrite]")
        return Boolean(await this.exec("ledcWrite", pin, duty, channel, freq, resolutionBits));
    }
}
exports.Esp32 = Esp32;
//# sourceMappingURL=Esp32.js.map