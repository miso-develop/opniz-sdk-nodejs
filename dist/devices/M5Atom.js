"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M5Atom = void 0;
const Esp32_1 = require("./Esp32");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
class M5Atom extends Esp32_1.Esp32 {
    constructor() {
        super(...arguments);
        this._name = "m5atom";
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
exports.M5Atom = M5Atom;
//# sourceMappingURL=M5Atom.js.map