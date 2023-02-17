const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	
	
	// onClickedをオーバーライド
	opniz.Btn.onClicked = (button, count) => console.log(`onClicked: ${JSON.stringify({ button, count })}`)
	
	// onSingleClickedをオーバーライド
	opniz.Btn.onSingleClicked = (button) => console.log(`${button} ボタンが押されました！`)
	
	// onDoubleClickedをオーバーライド
	opniz.Btn.onDoubleClicked = (button) => console.log(`${button} ボタンがダブルクリックされました！`)
	
	// onDeciedClickCountをオーバーライド
	opniz.Btn.onDeciedClickCount = (button, count) => console.log(`${button} ボタンが${count}回連続で押されました！`)
	
	// onHoldをオーバーライド
	opniz.Btn.onHold = (button) => console.log(`${button} ボタンが長押しされました！`)
	
	
	
	try {
		for (;;) {
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
