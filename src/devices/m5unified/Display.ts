import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:

export class Display {
	public FontType = FontType
	public FontTypeList = FontTypeList
	public TextDatumType = TextDatumType
	public TextDatumTypeList = TextDatumTypeList
	
	constructor(private opniz) {}
	
	private _convertNumberColorcode(color: number | string | undefined): number | undefined {
		if (!color) return undefined
		return typeof color === "string" ? parseInt(color.replace("#", ""), 16) : color
	}
	
	private _convertColor16(color24: number | undefined): number | undefined {
		if (!color24) return undefined
		return (color24 >> 8 & 0xf800) | (color24 >> 5 & 0x7e0) | (color24 >> 3 & 0x1f)
	}
	
	
	
	public async height(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.height(void):int32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async width(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.width(void):int32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async setRotation(rotation: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setRotation(uint_fast8_t):void", rotation)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async setCursor(x: number, y: number, font?: Display.FontType): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setCursor(int32_t,int32_t,uint8_t):void", x, y, font)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async color332(r: number, g: number, b: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.color332(uint8_t,uint8_t,uint8_t):uint8_t", r, g, b)
		return result === undefined ? undefined : Number(result)
	}
	
	public async color565(r: number, g: number, b: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.color565(uint8_t,uint8_t,uint8_t):uint16_t", r, g, b)
		return result === undefined ? undefined : Number(result)
	}
	
	public async color888(r: number, g: number, b: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.color888(uint8_t,uint8_t,uint8_t):uint32_t", r, g, b)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async drawString(string: string, x: number, y: number, font?: Display.FontType): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.drawString(const char*,int32_t,int32_t,uint8_t):size_t", string, x, y, font)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async drawCentreString(string: string, x: number, y: number, font?: Display.FontType): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.drawCentreString(const String&,int32_t,int32_t,uint8_t):size_t", string, x, y, font)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async drawRightString(string: string, x: number, y: number, font?: Display.FontType): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.drawRightString(const String&,int32_t,int32_t,uint8_t):size_t", string, x, y, font)
		return result === undefined ? undefined : Number(result)
	}
	
	public async print(str: string): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.print(const char):size_t", str)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async println(c?: string): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.println(const char):size_t", c)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async fillScreen(color?: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.fillScreen(const T&):void", this._convertColor16(this._convertNumberColorcode(color)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async clear(color?: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.clear(const T&):void", this._convertColor16(this._convertNumberColorcode(color)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async setTextColor(fgcolor: Display.Color, bgcolor?: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextColor(T1,T2):void", this._convertColor16(this._convertNumberColorcode(fgcolor)), this._convertColor16(this._convertNumberColorcode(bgcolor)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setTextDatum(datum: Display.TextDatumType): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextDatum(uint8_t):void", datum)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setTextFont(f: Display.FontType): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextFont(int):void", f)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async setTextSize(sx: number, sy?: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextSize(float,float):void", sx, sy)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setBrightness(brightness: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setBrightness(uint8_t):void", brightness)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getBrightness(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getBrightness(void):uint8_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async sleep(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.sleep(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async wakeup(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.wakeup(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async powerSave(flg: boolean): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.powerSave(bool):void", flg)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async powerSaveOn(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.powerSaveOn(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async powerSaveOff(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.powerSaveOff(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async clearDisplay(color?: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.clearDisplay(int32_t):void", this._convertColor16(this._convertNumberColorcode(color)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async fontHeight(font?: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.fontHeight(int8_t):int32_t", font)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async fontWidth(font?: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.fontWidth(int8_t):int32_t", font)
		return result === undefined ? undefined : Number(result)
	}
	
	public async getBaseColor(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getBaseColor(void):uint32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getColorDepth(): Promise<Display.ColorDepthType | undefined> {
		const result = await this.opniz.exec("_M5.Display.getColorDepth(void):color_depth_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getCursorX(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getCursorX(void):int32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getCursorY(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getCursorY(void):int32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getRawColor(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getRawColor(void):uint32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getRotation(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getRotation(void):uint8_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getTextDatum(): Promise<Display.TextDatumTypeList | undefined> {
		const result = await this.opniz.exec("_M5.Display.getTextDatum(void):textdatum_t")
		return result === undefined ? undefined : TextDatumTypeList[Number(result)]
	}
	
	public async getTextPadding(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getTextPadding(void):uint32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getTextSizeX(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getTextSizeX(void):float")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getTextSizeY(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.getTextSizeY(void):float")
		return result === undefined ? undefined : Number(result)
	}
	
	public async setBaseColor(c: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setBaseColor(T):void", this._convertColor16(this._convertNumberColorcode(c)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setColor(color: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setColor(T):void", this._convertColor16(this._convertNumberColorcode(color)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setColorDepth(depth: Display.ColorDepthType): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setColorDepth(color_depth_t):void", depth)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setRawColor(c: Display.Color): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setRawColor(uint32_t):void", this._convertColor16(this._convertNumberColorcode(c)))
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setTextPadding(paddingX: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextPadding(uint32_t):void", paddingX)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setTextScroll(scroll: boolean): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextScroll(bool):void", scroll)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async setTextWrap(wrapX: boolean, wrapY?: boolean): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextWrap(bool,bool):void", wrapX, wrapY)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async showFont(td?: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.showFont(uint32_t):void", td)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async textLength(string: string, width: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Display.textLength(const String&,int32_t):int32_t", string, width)
		return result === undefined ? undefined : Number(result)
	}
	
	public async waitDisplay(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.waitDisplay(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async progressBar(x: number, y: number, w: number, h: number, val: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.progressBar(int,int,int,int,uint8_t):void", x, y, w, h, val)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async qrcode(string: string, x?: number, y?: number, width?: number, version?: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.qrcode(const String,int32_t,int32_t,int32_t,uint8_t):void", string, x, y, width, version)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async scroll(dx: number, dy: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.scroll(int_fast16_t,int_fast16_t):void", dx, dy)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setScrollRect(x: number, y: number, w: number, h: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setScrollRect(int32_t,int32_t,int32_t,int32_t):void", x, y, w, h)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getScrollRect(): Promise<[number, number, number, number] | undefined> {
		const result = await this.opniz.exec("_M5.Display.getScrollRect(int32_t,int32_t ,int32_t ,int32_t):void")
		return result === undefined ? undefined : JSON.parse(result)
	}
	
	public async clearScrollRect(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.clearScrollRect(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getTextStyle(): Promise<Display.TextStyle | undefined> {
		const result = await this.opniz.exec("_M5.Display.getTextStyle(void):const TextStyle&")
		return result === undefined ? undefined : JSON.parse(result)
	}
	
	public async setTextStyle(textStyle: Display.TextStyle): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Display.setTextStyle(const TextStyle&):void", textStyle)
		return result === undefined ? undefined : Boolean(result)
	}
}

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
} as const

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
} as const

const FontTypeList: { [key: number]: string } = Object.entries(FontType).reduce((obj, entry) => ({ ...obj, [entry[1]]: entry[0] }), {})
const TextDatumTypeList: { [key: number]: string } = Object.entries(TextDatumType).reduce((obj, entry) => ({ ...obj, [entry[1]]: entry[0] }), {})

export namespace Display {
	export type TextStyle = {
		"fore_rgb888"?: number
		"back_rgb888"?: number
		"size_x"?: number
		"size_y"?: number
		"datum"?: number
		"padding_x"?: number
		"utf8"?: boolean
		"cp437"?: boolean
	}
	
	export type Color = string | number // TODO: とりあえずこれで。もっといい感じにしたい
	export type ColorDepthType = number // TODO: とりあえずこれで。もっといい感じにしたい
	
	export type FontType = typeof FontType[keyof typeof FontType]
	export type FontTypeList = typeof FontTypeList[keyof typeof FontTypeList]
	export type TextDatumType = typeof TextDatumType[keyof typeof TextDatumType]
	export type TextDatumTypeList = typeof TextDatumTypeList[keyof typeof TextDatumTypeList]
}
