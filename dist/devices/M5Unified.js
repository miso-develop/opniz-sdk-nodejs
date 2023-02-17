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
exports.M5Unified = void 0;
/* eslint @typescript-eslint/no-inferrable-types: "off" */
const Esp32_1 = require("./Esp32");
const LED_1 = require("./m5unified/LED");
const Button_1 = require("./m5unified/Button");
const IMU_1 = require("./m5unified/IMU");
const Display_1 = require("./m5unified/Display");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Unified]", ...v)) // DEBUG:
// MEMO: M5Unified@0.1.3
class M5Unified extends Esp32_1.Esp32 {
    // @ts-ignore TODO:
    constructor(parameters) {
        super(parameters);
        this.Led = new LED_1.LED(this);
        this.Btn = new Button_1.Button(this);
        this.Imu = new IMU_1.IMU(this);
        this.Display = new Display_1.Display(this);
        this.Lcd = this.Display;
        this.BoardType = BoardType;
        this.BoardTypeList = BoardTypeList;
        // Add rpc handler
        this.rpcHandler.add(...this.Btn.rpcHandlers);
    }
    begin(cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_M5.begin(const config_t&):void", cfg);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    config(cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_M5.config(const config_t&):config_t|void", cfg);
            return cfg ? true : result === undefined ? undefined : this._parseConfig(result);
        });
    }
    getBoard() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_M5.getBoard(void):board_t");
            return result === undefined ? undefined : BoardTypeList[Number(result)];
        });
    }
    getUpdateMsec() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_M5.getUpdateMsec(void):std::uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exec("_M5.update(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    _parseConfig(configStr) {
        const config = JSON.parse(configStr);
        return {
            "serial_baudrate": Number(config["serial_baudrate"]),
            "clear_display": Boolean(config["clear_display"]),
            "output_power": Boolean(config["output_power"]),
            "internal_imu": Boolean(config["internal_imu"]),
            "internal_rtc": Boolean(config["internal_rtc"]),
            "internal_spk": Boolean(config["internal_spk"]),
            "internal_mic": Boolean(config["internal_mic"]),
            "external_imu": Boolean(config["external_imu"]),
            "external_rtc": Boolean(config["external_rtc"]),
            "external_spk": Boolean(config["external_spk"]),
            "led_brightness": Number(config["led_brightness"]),
        };
    }
}
exports.M5Unified = M5Unified;
const BoardType = {
    "board_unknown": 0,
    "board_Non_Panel": 1,
    "board_M5Stack": 2,
    "board_M5StackCore2": 3,
    "board_M5StickC": 4,
    "board_M5StickCPlus": 5,
    "board_M5StackCoreInk": 6,
    "board_M5Paper": 7,
    "board_M5Tough": 8,
    "board_M5Station": 9,
    "board_M5StackCoreS3": 10,
    "board_M5AtomS3": 11,
    "board_M5Atom": 12,
    "board_M5AtomPsram": 13,
    "board_M5AtomU": 14,
    "board_M5Camera": 15,
    "board_M5TimerCam": 16,
    "board_M5StampPico": 17,
    "board_M5StampC3": 18,
    "board_M5StampC3U": 19,
    "board_M5StampS3": 20,
    "board_M5AtomS3Lite": 21,
    "board_M5AtomDisplay": 22,
    "board_M5UnitLCD": 23,
    "board_M5UnitOLED": 24,
    "board_M5UnitRCA": 25,
    "board_M5ModuleDisplay": 26,
    "board_M5ModuleRCA": 27,
};
const BoardTypeList = Object.entries(BoardType).reduce((obj, entry) => (Object.assign(Object.assign({}, obj), { [entry[1]]: entry[0] })), {});
