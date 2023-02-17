// RGB LED搭載デバイスで実行（M5ATOM Matrix / Lite / Echo / U, M5ATOMS3 Lite, M5Stamp Pico / S3）
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

const OFF = "#000000"
const GREEN = "#00ff00"
let state = true

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに内蔵LEDを点滅
		for (;;) {
			await opniz.Led.fillpix(state ? GREEN : OFF)
			state = !state
			
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
