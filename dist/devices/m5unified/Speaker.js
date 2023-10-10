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
exports.Speaker = void 0;
class Speaker {
    constructor(opniz) {
        this.opniz = opniz;
    }
    // MEMO: Overload
    config(cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.config(speaker_config_t&?):void|speaker_config_t", cfg);
            return result === undefined ? undefined :
                cfg ? Boolean(result) : JSON.parse(result);
        });
    }
    begin() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.begin(void):bool");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.end(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    isRunning() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.isRunning(void):bool");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.isEnabled(void):bool");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    // MEMO: Overload
    isPlaying(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.isPlaying(uint8_t?):size_t|bool", channel);
            return result === undefined ? undefined :
                channel ? Number(result) : Boolean(result);
        });
    }
    getPlayingChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.getPlayingChannels(void):size_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    setVolume(masterVolume) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.setVolume(uint8_t):void", masterVolume);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getVolume() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.getVolume(void):uint8_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    setAllChannelVolume(volume) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.setAllChannelVolume(uint8_t):void", volume);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setChannelVolume(channel, volume) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.setChannelVolume(uint8_t,uint8_t):void", channel, volume);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getChannelVolume(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.getChannelVolume(uint8_t):uint8_t", channel);
            return result === undefined ? undefined : Number(result);
        });
    }
    // MEMO: Overload
    stop(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.stop(uint8_t?):void", channel);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    // eslint-disable-next-lineno-inferrable-types
    tone(frequency, duration = 0, channel = -1, stopCurrentSound = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Speaker.tone(float,uint32_t,int,bool):bool", frequency, duration, channel, stopCurrentSound);
            return result === undefined ? undefined : Boolean(result);
        });
    }
}
exports.Speaker = Speaker;
