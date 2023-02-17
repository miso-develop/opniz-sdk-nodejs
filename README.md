# opniz SDK for Node.js

<div align="center"><img src="https://user-images.githubusercontent.com/22117028/150321839-e1e73dcb-d4b6-4bac-92b9-b1501ff3b092.png" alt="logo"></div>

> ❗ このプロジェクトは現在アルファ版です。

opnizとはM5StackといったESP32デバイスをNode.jsからobnizライクに遠隔制御するための、Node.js SDKおよびArduinoライブラリです。  
しくみとしてはESP32デバイスおよびNode.js SDK間にてJSON形式のRPCメッセージをやりとりし、相互に定義されたメソッドを呼び合います。  

![overview](https://user-images.githubusercontent.com/22117028/150321859-5dde911d-91da-41f4-abee-3ad696905529.png)

新たなデバイスクラスや独自のメソッドを簡単に拡張できる設計となっています。  
またクラウド環境（PaaS、FaaS等）でも動作させることができます。  



## Node.js SDK

本リポジトリはNode.js SDKのリポジトリとなります。  
デバイスのRead/Writeを実行したり（Pinも動的に指定可能です）、デバイス側からのイベント（たとえばM5Stack系デバイスのボタン等）を受け取って非同期に処理を実行したりできます。  
またM5UnifiedおよびM5Atom Arduino LibraryのAPIもいくつか実装しています。  



## 対応デバイス

* M5Stack BASIC
* M5Stack Core2
* M5StickC
* M5ATOM Matrix
* M5ATOM Lite
* M5ATOM Echo
* M5ATOM U
* M5ATOMS3
* M5ATOMS3 Lite
* M5Stamp Pico
* M5Stamp S3
* その他ESP32、ESP32-PICO-D4、ESP32-S3デバイス



## インストール

```
npm install opniz
```



## 使い方

> ❗ 事前にデバイスへopniz Arduinoライブラリ（[M5Unified向け](https://github.com/miso-develop/opniz-arduino-m5unified)もしくは[ESP32向け](https://github.com/miso-develop/opniz-arduino-esp32)）を書き込んでください。  
> [opniz CLI (npm)](https://github.com/miso-develop/opniz-cli) を使用するとかんたんにデバイス書き込みできます。  

以下のコードは最小限のopnizのJavaScript実装コードです。  
opnizインスタンスの生成、opnizデバイスへの接続、デバイスへの操作の3ステップを実行しています。  
`address`、`port`をデバイスのIPアドレスと、任意のポート番号に書き換えて実行してみてください。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）

; (async () => {
	const opniz = new Opniz.Esp32({ port }) // opnizインスタンス生成
	await opniz.connectWait()                   // opnizデバイスへ接続
	console.log(await opniz.getFreeHeap())      // opnizデバイスのヒープメモリーサイズを取得して表示
})()
```

実際にデバイスを24時間稼働で実装する場合は以下のようにループ実装します。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.Esp32({ port }) // opnizインスタンス生成

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきにデバイスのヒープメモリーサイズを表示
		for (;;) {
			console.log(await opniz.getFreeHeap())
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch(e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
```



## 実装例

> ❗ 事前にM5ATOM等の内蔵LED搭載デバイスへ[opniz Arduinoライブラリ（M5Unified向け）](https://github.com/miso-develop/opniz-arduino-m5unified)を書き込んでください  

### M5ATOMでLチカ（内蔵LED）

M5ATOM（内蔵フルカラーLED搭載端末であれば他のM5Stackデバイスでも大丈夫です）でLチカを行ってみます。  

以下のコードを実行すると1秒おきにLEDが点滅します。  
`await opniz.Led.fillpix(color)`が内蔵LEDを制御するメソッドです。  
このようにデバイスをArduinoライブラリを用いて実装するのと同じ感覚でNode.jsにて実装できます。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスでの指定と合わせる）
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
```

### IOに接続したLEDでLチカ

次に内蔵LEDではなく、IOに接続したLEDを制御してみましょう。  

以下のコードを実行すると21番ピンに接続したLEDが1秒おきに点滅します。  
`await opniz.digitalWrite(pin, state ? HIGH : LOW)`にて変数`pin`に指定したピンをdigitalWriteで制御しています。  
このようにNode.js SDKより動的にピンをアサインして制御できます。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスでの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

const pin = 21 // LEDを繋いだピン番号を指定

const HIGH = 1
const LOW = 0
let state = true

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに`pin`に接続したLEDを点滅
		for (;;) {
			await opniz.digitalWrite(pin, state ? HIGH : LOW)
			state = !state
			
			await opniz.sleep(1000)
		}
		
	// エラー処理
	} catch(e) {
		console.log("[error]", e.message)
		await main()
	}
}
main()
```

### デバイスのボタンイベントを拾って処理する

次のコードを実行し、デバイスのボタンを押すとコンソールに`onClicked!`と表示されます。  
`opniz.Btn.onClicked = (button, count) => console.log("onClicked!")`のように`onClicked`メソッドを上書くことでボタンイベントを拾い、任意の処理を行います。  
このonメソッドはデバイスクラスにて任意に実装可能です。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスでの指定と合わせる）
const opniz = new Opniz.M5Unified({ port }) // opnizインスタンス生成

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connectWait())) console.log("connect...")
	console.log("[connected]")
	
	// デバイスのボタンが押されたらconsole表示
	opniz.Btn.onClicked = (button, count) => console.log("onClicked!")
	
	try {
		// 無限ループ
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
```



## API

#### analogRead(pin: number): Promise\<number\>

`pin`に指定したピンからアナログ値を読み取ります。  

#### digitalRead(pin: number): Promise\<number\>

`pin`に指定したピンからデジタル値（0 or 1）を読み取ります。  

#### digitalWrite(pin: number, val: number): Promise\<boolean\>

`pin`に指定したピンから`value`に指定したデジタル値（0 or 1）を出力します。  

#### ledcWrite(pin: number, duty: number, channel: number, freq: number, resolutionBits: number): Promise\<boolean\>

`pin`に指定したピンからPWM出力します。  

#### restart(): Promise\<boolean\>

デバイスを再起動します。  

### M5Unified API

現在[M5Unifiedライブラリ](https://github.com/m5stack/M5Unified)の[`Display`](https://github.com/m5stack/M5GFX)、[`Button`](https://github.com/m5stack/M5Unified/blob/master/src/utility/Button_Class.hpp)、[`IMU`](https://github.com/m5stack/M5Unified/blob/master/src/utility/IMU_Class.hpp)クラスのメソッドをいくつか実装しています。  

* [Display Class](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_m5unified_Display.Display-1.html)
* [Button Class](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_m5unified_Button.Button-1.html)
* [IMU Class](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_m5unified_IMU.IMU-1.html)

### RGB LED API

M5Atomライブラリの[`LED_Display`](https://github.com/m5stack/M5Atom/blob/master/src/utility/LED_DisPlay.h)クラスを内部インクルードしいくつか実装しています。  

[LED Class](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_m5unified_LED.LED-1.html)



## ドキュメント

[**TypeDoc**](https://miso-develop.github.io/opniz-sdk-nodejs/)  

* [Class M5Unified](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_M5Unified.M5Unified-1.html)
* [Class M5Atom (Deprecated)](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_M5Atom.M5Atom.html)
* [Class Esp32](https://miso-develop.github.io/opniz-sdk-nodejs/classes/devices_Esp32.Esp32.html)



## 利用可能な通信プロトコル

opniz Node.js SDKでは以下の通信プロトコルを実装しています。  
デフォルトでは`WebSocket (Server)`が使用されます。  

* WebSocket (Server)
* WebSocket (Client)
* TCP (Server/Client同居)

opniz Arduinoライブラリでは以下の通信プロトコルを実装しています。  
デフォルトでは`WebSocket (Client)`が使用されます。  

* WebSocket (Client)
* TCP (Server/Client同居)

使用するプロトコルによりopnizのコンストラクタパラメータが変わってきます。  

|プロトコル|コンストラクタパラメータ|パラメータ内容|
|---|---|---|
|WebSocket (Server)|`Opniz.Esp32({ port })`|`port`: listenするポート番号を指定します|
|WebSocket (Client)|`Opniz.Esp32({ address, port, id?, protocol?: "WebSocketClient" })`|`address`: 接続先のopnizのIPアドレスまたはhostnameを指定します<br>`port`: 接続先のopnizのWebSocket Serverポート番号を指定します<br>`id`: [opniz Server](https://github.com/miso-develop/opniz-server)を経由してopnizデバイスと接続する場合に、opnizデバイスで指定した`id`と同じ値を指定します（省略可）<br>`protocol`: "WebSocketClient"プロトコルを指定します（`id`が指定されている場合は省略可能です）|
|TCP (Server/Client同居)|`Opniz.Esp32({ address, port, serverPort?, protocol?: "TCP" })`|`address`: 接続先のopnizのIPアドレスを指定します<br>`port`: 接続先のopnizのTCP Serverポート番号を指定します<br>`serverPort`: listenするポート番号を指定します（省略可能で、省略時は`port`と同じ値となります）<br>`protocol`: "TCP"を指定します（`serverPort`が指定されている場合は省略可能です）|

またNode.js SDK同士の接続も可能です。  



## 関連リポジトリ

* [opniz Arduino Library for M5Unified](https://github.com/miso-develop/opniz-arduino-m5unified)
	* M5Unified向けArduinoライブラリ
* [opniz Arduino Library for M5ATOM](https://github.com/miso-develop/opniz-arduino-m5atom)
	* M5ATOM向けArduinoライブラリ
* [opniz Arduino Library for ESP32](https://github.com/miso-develop/opniz-arduino-esp32)
	* ESP32向けArduinoライブラリ
* [opniz CLI](https://github.com/miso-develop/opniz-cli)
	* opniz Arduino LibraryのBasicスケッチをコマンドから簡単に書き込めるCLIツール
* [opniz Server](https://github.com/miso-develop/opniz-server)
	* opniz Node.js SDKやopnizデバイスからのJSON RPCメッセージを中継するWebSocketサーバ



## ライセンス

[MIT](./LICENSE)
