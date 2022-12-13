const { Opniz } = require("opniz")

const port = 3000
const opniz = new Opniz.M5Atom({ port }) // opnizインスタンス生成

const HIGH = 1
const LOW = 0
let value = LOW

const pin = 10

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに内蔵LEDを点滅
		for (;;) {
			value = value === LOW ? HIGH : LOW
			await opniz.digitalWrite(pin, value)
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
