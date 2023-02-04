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
exports.Imu = exports.Btn = exports.Dis = exports.M5Atom = void 0;
/* eslint @typescript-eslint/no-inferrable-types: "off" */
const Esp32_1 = require("./Esp32");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
class M5Atom extends Esp32_1.Esp32 {
    constructor() {
        super(...arguments);
        this.dis = new Dis(this);
        this.Btn = new Btn(this);
        this.IMU = new Imu(this);
        this._checkColorCode = (colorCode) => {
            // const regexp = /^#([0-9a-fA-F]{3}|[0-9a-fA-number: numberF]{6})$/ // TODO: おいおい実装したら↓と切り替え
            const regexp = /^#([0-9a-fA-F]{6})$/;
            if (!regexp.test(colorCode))
                throw new Error("Invalid color code format.");
        };
        // add onmethod event
        this.onbutton = (params) => { };
    }
    init() {
        super.init();
        // add rpc handler
        this.rpcHandler.add({
            name: "button",
            procedure: (params) => __awaiter(this, void 0, void 0, function* () {
                yield this.onbutton(params);
                return params ? JSON.stringify(params) : "true";
            }),
        });
    }
    // public async drawpix(number: number, color: string): Promise<boolean> {
    // 	checkColorCode(color)
    // 	return Boolean(await super.exec("drawpix", number, color))
    // }
    // public async drawpix(xpos: number, ypos: number, Color: string): Promise<boolean> {
    // 	return Boolean(await super.exec("_M5.dis.drawpix(uint8_t,uint8_t,CRGB):void", xpos, ypos, Color))
    // }
    begin(SerialEnable = true, I2CEnable = true, DisplayEnable = false) {
        const _super = Object.create(null, {
            exec: { get: () => super.exec }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield _super.exec.call(this, "_M5.begin(bool,bool,bool):void", SerialEnable, I2CEnable, DisplayEnable));
        });
    }
    update() {
        const _super = Object.create(null, {
            exec: { get: () => super.exec }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield _super.exec.call(this, "_M5.update():void"));
        });
    }
}
exports.M5Atom = M5Atom;
class Dis {
    constructor(opniz) {
        this.opniz = opniz;
    }
    // public async run(*data: undefined): Promise<boolean> {
    // 	return Boolean(!!await this.opniz.exec("_M5.dis.run(void):void", *data))
    // }
    setBrightness(brightness) {
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield this.opniz.exec("_M5.dis.setBrightness(uint8_t):void", brightness));
        });
    }
    // TODO: TypeScriptだとオーバーロード実装さくっとできない…
    // public async drawpix(xpos: number, ypos: number, Color: string): Promise<boolean> {
    // 	return Boolean(!!await this.opniz.exec("_M5.dis.drawpix(uint8_t,uint8_t,CRGB):void", xpos, ypos, Color))
    // }
    drawpix(Number, Color) {
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield this.opniz.exec("_M5.dis.drawpix(uint8_t,CRGB):void", Number, Color));
        });
    }
    fillpix(Color) {
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield this.opniz.exec("_M5.dis.fillpix(CRGB):void", Color));
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield this.opniz.exec("_M5.dis.clear():void"));
        });
    }
    setWidthHeight(xColumns, yRows) {
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(yield this.opniz.exec("_M5.dis.setWidthHeight(uint16_t,uint16_t):void", xColumns, yRows));
        });
    }
}
exports.Dis = Dis;
class Btn {
    constructor(opniz) {
        this.opniz = opniz;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.read():uint8_t")) || -1);
        });
    }
    isPressed() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.isPressed():uint8_t")) || -1);
        });
    }
    isReleased() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.isReleased():uint8_t")) || -1);
        });
    }
    wasPressed() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.wasPressed():uint8_t")) || -1);
        });
    }
    wasReleased() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.wasReleased():uint8_t")) || -1);
        });
    }
    pressedFor(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.pressedFor(uint32_t):uint8_t", ms)) || -1);
        });
    }
    releasedFor(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.releasedFor(uint32_t):uint8_t", ms)) || -1);
        });
    }
    wasReleasefor(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.wasReleasefor(uint32_t):uint8_t", ms)) || -1);
        });
    }
    lastChange() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.Btn.lastChange():uint32_t")) || -1);
        });
    }
}
exports.Btn = Btn;
class Imu {
    constructor(opniz) {
        this.opniz = opniz;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return Number((yield this.opniz.exec("_M5.IMU.Init():int")) || -1);
        });
    }
    getAccelAdc() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse((yield this.opniz.exec("_M5.IMU.getAccelAdc(int16_t*,int16_t*,int16_t*):void")) || "[-1,-1,-1]");
        });
    }
}
exports.Imu = Imu;
