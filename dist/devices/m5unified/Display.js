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
exports.Display = void 0;
class Display {
    constructor(opniz) {
        this.opniz = opniz;
        this.FontType = FontType;
        this.FontTypeList = FontTypeList;
        this.TextDatumType = TextDatumType;
        this.TextDatumTypeList = TextDatumTypeList;
    }
    _convertNumberColorcode(color) {
        if (!color)
            return undefined;
        return typeof color === "string" ? parseInt(color.replace("#", ""), 16) : color;
    }
    _convertColor16(color24) {
        if (!color24)
            return undefined;
        return (color24 >> 8 & 0xf800) | (color24 >> 5 & 0x7e0) | (color24 >> 3 & 0x1f);
    }
    height() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.height(void):int32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    width() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.width(void):int32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    setRotation(rotation) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setRotation(uint_fast8_t):void", rotation);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setCursor(x, y, font) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setCursor(int32_t,int32_t,uint8_t):void", x, y, font);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    color332(r, g, b) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.color332(uint8_t,uint8_t,uint8_t):uint8_t", r, g, b);
            return result === undefined ? undefined : Number(result);
        });
    }
    color565(r, g, b) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.color565(uint8_t,uint8_t,uint8_t):uint16_t", r, g, b);
            return result === undefined ? undefined : Number(result);
        });
    }
    color888(r, g, b) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.color888(uint8_t,uint8_t,uint8_t):uint32_t", r, g, b);
            return result === undefined ? undefined : Number(result);
        });
    }
    drawString(string, x, y, font) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.drawString(const char*,int32_t,int32_t,uint8_t):size_t", string, x, y, font);
            return result === undefined ? undefined : Number(result);
        });
    }
    drawCentreString(string, x, y, font) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.drawCentreString(const String&,int32_t,int32_t,uint8_t):size_t", string, x, y, font);
            return result === undefined ? undefined : Number(result);
        });
    }
    drawRightString(string, x, y, font) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.drawRightString(const String&,int32_t,int32_t,uint8_t):size_t", string, x, y, font);
            return result === undefined ? undefined : Number(result);
        });
    }
    print(str) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.print(const char):size_t", str);
            return result === undefined ? undefined : Number(result);
        });
    }
    println(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.println(const char):size_t", c);
            return result === undefined ? undefined : Number(result);
        });
    }
    fillScreen(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.fillScreen(const T&):void", this._convertColor16(this._convertNumberColorcode(color)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    clear(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.clear(const T&):void", this._convertColor16(this._convertNumberColorcode(color)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextColor(fgcolor, bgcolor) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextColor(T1,T2):void", this._convertColor16(this._convertNumberColorcode(fgcolor)), this._convertColor16(this._convertNumberColorcode(bgcolor)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextDatum(datum) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextDatum(uint8_t):void", datum);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextFont(f) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextFont(int):void", f);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextSize(sx, sy) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextSize(float,float):void", sx, sy);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setBrightness(brightness) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setBrightness(uint8_t):void", brightness);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getBrightness() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getBrightness(void):uint8_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    sleep() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.sleep(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    wakeup() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.wakeup(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    powerSave(flg) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.powerSave(bool):void", flg);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    powerSaveOn() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.powerSaveOn(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    powerSaveOff() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.powerSaveOff(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    clearDisplay(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.clearDisplay(int32_t):void", this._convertColor16(this._convertNumberColorcode(color)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    fontHeight(font) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.fontHeight(int8_t):int32_t", font);
            return result === undefined ? undefined : Number(result);
        });
    }
    fontWidth(font) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.fontWidth(int8_t):int32_t", font);
            return result === undefined ? undefined : Number(result);
        });
    }
    getBaseColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getBaseColor(void):uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getColorDepth() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getColorDepth(void):color_depth_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getCursorX() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getCursorX(void):int32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getCursorY() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getCursorY(void):int32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getRawColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getRawColor(void):uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getRotation() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getRotation(void):uint8_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getTextDatum() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getTextDatum(void):textdatum_t");
            return result === undefined ? undefined : TextDatumTypeList[Number(result)];
        });
    }
    getTextPadding() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getTextPadding(void):uint32_t");
            return result === undefined ? undefined : Number(result);
        });
    }
    getTextSizeX() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getTextSizeX(void):float");
            return result === undefined ? undefined : Number(result);
        });
    }
    getTextSizeY() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getTextSizeY(void):float");
            return result === undefined ? undefined : Number(result);
        });
    }
    setBaseColor(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setBaseColor(T):void", this._convertColor16(this._convertNumberColorcode(c)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setColor(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setColor(T):void", this._convertColor16(this._convertNumberColorcode(color)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setColorDepth(depth) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setColorDepth(color_depth_t):void", depth);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setRawColor(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setRawColor(uint32_t):void", this._convertColor16(this._convertNumberColorcode(c)));
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextPadding(paddingX) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextPadding(uint32_t):void", paddingX);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextScroll(scroll) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextScroll(bool):void", scroll);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setTextWrap(wrapX, wrapY) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextWrap(bool,bool):void", wrapX, wrapY);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    showFont(td) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.showFont(uint32_t):void", td);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    textLength(string, width) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.textLength(const String&,int32_t):int32_t", string, width);
            return result === undefined ? undefined : Number(result);
        });
    }
    waitDisplay() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.waitDisplay(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    progressBar(x, y, w, h, val) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.progressBar(int,int,int,int,uint8_t):void", x, y, w, h, val);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    qrcode(string, x, y, width, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.qrcode(const String,int32_t,int32_t,int32_t,uint8_t):void", string, x, y, width, version);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    scroll(dx, dy) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.scroll(int_fast16_t,int_fast16_t):void", dx, dy);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    setScrollRect(x, y, w, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setScrollRect(int32_t,int32_t,int32_t,int32_t):void", x, y, w, h);
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getScrollRect() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getScrollRect(int32_t,int32_t ,int32_t ,int32_t):void");
            return result === undefined ? undefined : JSON.parse(result);
        });
    }
    clearScrollRect() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.clearScrollRect(void):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getTextStyle() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.getTextStyle(void):const TextStyle&");
            return result === undefined ? undefined : JSON.parse(result);
        });
    }
    setTextStyle(textStyle) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Display.setTextStyle(const TextStyle&):void", textStyle);
            return result === undefined ? undefined : Boolean(result);
        });
    }
}
exports.Display = Display;
const FontType = {
    "ft_unknown": 1,
    "ft_glcd": 2,
    "ft_bmp": 3,
    "ft_rle": 4,
    "ft_gfx": 5,
    "ft_bdf": 6,
    "ft_vlw": 7,
    "ft_u8g2": 8,
    "ft_ttf": 9,
};
const TextDatumType = {
    "top_left": 0,
    "top_center": 1,
    "top_centre": 1,
    "top_right": 2,
    "middle_left": 4,
    "middle_center": 5,
    "middle_centre": 5,
    "middle_right": 6,
    "bottom_left": 8,
    "bottom_center": 9,
    "bottom_centre": 9,
    "bottom_right": 10,
    "baseline_left": 16,
    "baseline_center": 17,
    "baseline_centre": 17,
    "baseline_right": 18,
};
const FontTypeList = Object.entries(FontType).reduce((obj, entry) => (Object.assign(Object.assign({}, obj), { [entry[1]]: entry[0] })), {});
const TextDatumTypeList = Object.entries(TextDatumType).reduce((obj, entry) => (Object.assign(Object.assign({}, obj), { [entry[1]]: entry[0] })), {});
