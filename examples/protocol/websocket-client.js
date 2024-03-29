// RGB LED搭載デバイスで実行（M5ATOM Matrix / Lite / Echo / U, M5ATOMS3 Lite, M5Stamp Pico / S3）
// WebSocketClientプロトコルは主にopniz Serverに接続する場合に使用します
const { Opniz } = require("opniz")

const address = "192.168.0.1" // 任意のアドレスを指定（WebSocket Serverのアドレスを指定）
const port = 3000 // 任意のポートを指定（WebSocket Server側の指定と合わせる）
const id = "1234-5678" // 任意のIDを指定（WebSocket Server側の指定と合わせる）
const protocol = Opniz.Protocol.WebSocketClient
const opniz = new Opniz.M5Unified({ address, port, id, protocol }) // opnizインスタンス生成

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
			await opniz.sleep(1000)
			state = !state
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
