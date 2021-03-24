const { Opniz } = require("opniz")

const address = "192.168.0.1"
const port = 3000

const OFF = "#000000"
const BLUE = "#0000ff"
let color = OFF

const main = async () => {
	// opnizインスタンス生成
	const opniz = new Opniz.M5Atom({ address, port })
	
	// opnizデバイスへ接続
	while (!(await opniz.connect())) {
		console.log("connect...")
		await opniz.sleep(1000)
	}
	console.log("[connected]")
	
	// M5ATOMのボタンが押されたらconsole表示
	opniz.onbutton = () => console.log("on button!")
	
	try {
		// 1秒おきに内蔵LEDを青色で点滅
		for (;;) {
			color = color === OFF ? BLUE : OFF
			await opniz.drawpix(0, color)
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log(`[error] ${e.message}`)
		await main()
	}
}
main()
