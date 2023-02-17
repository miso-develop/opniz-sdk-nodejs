// IMU搭載デバイスで実行（M5Stack Core2, M5StickC, M5ATOM Matrix, M5ATOMS3）
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに加速度、ジャイロの値を取得
		for (;;) {
			console.log("Acceleration: ", await opniz.Imu.getAccel()) // 加速度を取得
			console.log("Gyro: ", await opniz.Imu.getGyro()) // 角速度を取得
			
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
