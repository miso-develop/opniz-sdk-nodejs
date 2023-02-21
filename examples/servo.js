// サーボモーターSG90等を接続して実行
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

const pin = 25 // サーボモーターを繋いだピン番号を指定

const channel = 0

const freq = 50
const resolutionBits = 10

const ServoSpec = {	// サーボモータースペック
	angle: 180,		// 稼働角度
	pulse: {
		max: 2.4,	// 最大パルス幅
		min: 0.5,	// 最小パルス幅
	},
}

let currentAngle = 0



const angle2duty = (angle) => {
	if (angle > ServoSpec.angle || angle < 0) throw Error("Over angle!")
	const angleRatio = angle / ServoSpec.angle
	const pulseRange = ServoSpec.pulse.max - ServoSpec.pulse.min
	const pulse = angleRatio * pulseRange + ServoSpec.pulse.min
	const cycleMSec = 1 / freq * 1000
	const resolution = 2 ** resolutionBits
	const duty = Math.round(pulse / cycleMSec * resolution)
	return duty
}



const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに45度づつ角度を変更し、最大角へ達したら0度へ戻る
		for (;;) {
			const duty = angle2duty(currentAngle)
			await opniz.ledcWrite(pin, duty, channel, freq, resolutionBits)
			currentAngle += 45
			currentAngle = currentAngle > ServoSpec.angle ? 0 : currentAngle
			
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch (e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
