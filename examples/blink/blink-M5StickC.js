const { Opniz } = require("opniz")

const address = "192.168.0.1"
const port = 3000

const HIGH = 1
const LOW = 0
let value = LOW

const pin = 10

const main = async () => {
	// opnizインスタンス生成
	const opniz = new Opniz.M5Atom({ address, port })
	
	// opnizデバイスへ接続
	while (!(await opniz.connect())) {
		console.log("connect...")
		await opniz.sleep(1000)
	}
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
		console.log(`[error] ${e.message}`)
		await main()
	}
}
main()
