// ディスプレイ搭載デバイスで実行（M5Stack / Core2, M5StickC, M5ATOMS3）
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

let state = true

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	await opniz.Display.setTextSize(2)
	
	try {
		// 1秒おきにディスプレイに`Hello World!`を表示
		for (;;) {
			await opniz.Display.clear()
			await opniz.Display.setCursor(16, 16)
			await opniz.Display.println(state ? "Hello World!" : "")
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
