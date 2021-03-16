"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M5AtomLite = void 0;
const Esp32Pico_1 = require("./Esp32Pico");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
class M5AtomLite extends Esp32Pico_1.Esp32Pico {
    constructor() {
        super(...arguments);
        this._name = "m5atom-lite";
        // add device events onmethod
        this.onbutton = () => { };
    }
    addDeviceMessageHandlers(messageHandlers) {
        messageHandlers.push({ name: "button", listener: () => this.onbutton() });
    }
    async drawpix(number, color) {
        // const regexp = /^#([0-9a-fA-F]{3}|[0-9a-fA-number: numberF]{6})$/ // TODO: おいおい実装したら↓と切り替え
        const regexp = /^#([0-9a-fA-F]{6})$/;
        if (!regexp.test(color))
            return false;
        return Boolean(await super.exec("drawpix", number, color));
    }
}
exports.M5AtomLite = M5AtomLite;
//# sourceMappingURL=M5AtomLite.js.map