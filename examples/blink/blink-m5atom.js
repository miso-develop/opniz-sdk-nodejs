const { Opniz } = require("opniz")

const port = 3000
const opniz = new Opniz.M5Atom({ port }) // opnizインスタンス生成

const OFF = "#000000"
const GREEN = "#00ff00"
let color = OFF

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに内蔵LEDを緑色で点滅
		for (;;) {
			color = color === OFF ? GREEN : OFF
			await opniz.dis.drawpix(0, color)
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
