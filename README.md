# opniz SDK for Node.js

![logo](./extras/images/logo.png)

`❗ このプロジェクトは現在アルファ版です。`

opnizとはM5StackといったESP32デバイスをNode.jsからobnizライクに遠隔制御するための、**Node.js SDK**および**Arduinoライブラリ**です。  
しくみとしてはESP32デバイスおよびNode.js SDK間にて**JSON形式のRPCメッセージ**をやりとりし、相互に定義されたメソッドを呼び合います。  

![overview](./extras/images/overview.png)

現在Node.js SDK、Arduinoライブラリともに**ESP32**および**M5ATOM**クラスを実装しています。  
M5ATOMクラスで**M5Stack、M5StickC、M5ATOM Lite、M5ATOM Matrixでの動作を確認しています。**  

新たなデバイスクラスや独自のメソッドを簡単に拡張できる設計となっています。  
また**クラウド環境（PaaS、FaaS等）でも動作**させることができます。  



## Node.js SDK

本リポジトリはNode.js SDKのリポジトリとなります。  
デバイスのRead/Writeを実行したり（Pinも動的に指定可能です）、デバイス側からのイベント（たとえばM5Stack系デバイスのボタン等）を受け取って非同期に処理を実行したりできます。  



## インストール方法

```
npm install opniz
```

※別途デバイスへもopniz Arduinoライブラリ（[M5ATOM向け](https://github.com/miso-develop/opniz-arduino-m5atom)もしくは[ESP32向け](https://github.com/miso-develop/opniz-arduino-esp32)）を使用したスケッチの書き込みが必要です。  



## 使い方

❗ 事前にデバイスへopniz Arduinoライブラリ（[M5ATOM向け](https://github.com/miso-develop/opniz-arduino-m5atom)もしくは[ESP32向け](https://github.com/miso-develop/opniz-arduino-esp32)）を書き込んでください  

以下のコードは最小限のopnizのJavaScript実装コードです。  
opnizインスタンスの生成、opnizデバイスへの接続、デバイスへの操作の3ステップを実行しています。  
`address`、`port`をデバイスのIPアドレスと、任意のポート番号に書き換えて実行してみてください。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）

; (async () => {
	const opniz = new Opniz.Esp32({ port }) // opnizインスタンス生成
	await opniz.connect()                   // opnizデバイスへ接続
	console.log(await opniz.getFreeHeap())  // opnizデバイスのヒープメモリーサイズを取得して表示
})()
```

実際にデバイスを24時間稼働で実装する場合は以下のようにループ実装します。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスの指定と合わせる）
const opniz = new Opniz.Esp32({ port }) // opnizインスタンス生成

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connect())) console.log("connect...")
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

❗ 事前にM5ATOMへ[opniz Arduinoライブラリ（M5ATOM向け）](https://github.com/miso-develop/opniz-arduino-m5atom)を書き込んでください  

### M5ATOMでLチカ（内蔵LED）

M5ATOM（Lite、Matrixどちらでもかまいません）でLチカを行ってみます。  
まずはM5ATOMに内蔵されているLEDを制御します。  
※M5Stack、M5StickCは「M5ATOMでLチカ（ピンに挿したLED）」をお試しください  

以下のコードを実行すると1秒おきにLEDが緑色に点滅します。  
21行目の`await opniz.dis.drawpix(0, color)`が内蔵LEDを制御するメソッドです。  
これはM5ATOMのArduinoライブラリで実装されている関数`M5.dis.drawpix`と名前、引数とも同じです。  
このようにデバイスをArduinoライブラリを用いて実装するのと同じ感覚でNode.jsにて実装できます。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスでの指定と合わせる）
const opniz = new Opniz.M5Atom({ port }) // opnizインスタンス生成

const OFF = "#000000"
const GREEN = "#ff0000"
let color = OFF

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connect())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに内蔵LEDを緑色に点滅
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
```

### M5ATOMでLチカ（ピンに挿したLED）

次に内蔵LEDではなく、ピンに挿したLEDを制御してみましょう。  
M5ATOM Lite、Matrixの場合、21番ピンとGNDにLEDを挿します（必要に応じて抵抗を添えてください）。  
※M5Stack、M5StickCはピン番号を任意に置き換えてお試しください  

以下のコードを実行すると1秒おきにLEDが点滅します。  
21行目の`await opniz.digitalWrite(21, value)`にて21番ピンをdigitalWriteで制御しています。  
このようにNode.js SDKより動的にピンをアサインして制御できます。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスでの指定と合わせる）
const opniz = new Opniz.M5Atom({ port }) // opnizインスタンス生成

const HIGH = 1
const LOW = 0
let value = LOW

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connect())) console.log("connect...")
	console.log("[connected]")
	
	try {
		// 1秒おきに21番ピンとGNDに挿したLEDを点滅
		for (;;) {
			value = value === LOW ? HIGH : LOW
			await opniz.digitalWrite(21, value)
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

### M5ATOMのボタンイベントを拾って処理する

次のコードを実行し、M5ATOMのボタンを押すとconsoleに`onbutton!`と表示されます。  
14行目の`opniz.onbutton = () => console.log("on button!")`のように`onbutton`メソッドを上書くことでボタンイベントを拾い、任意の処理を行います。  
このonメソッドはデバイスクラスにて任意に実装可能です。  

```js
const { Opniz } = require("opniz")

const port = 3000 // 任意のポートを指定（opnizデバイスでの指定と合わせる）
const opniz = new Opniz.M5Atom({ port }) // opnizインスタンス生成

const main = async () => {
	// opnizデバイスへ接続
	while (!(await opniz.connect())) console.log("connect...")
	console.log("[connected]")
	
	// M5ATOMのボタンが押されたらconsole表示
	opniz.onbutton = () => console.log("onbutton!")
	
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



## ドキュメント

[TypeDoc](https://miso-develop.github.io/opniz-sdk-nodejs/)



## 関連リポジトリ

* [opniz Arduino Library for M5ATOM](https://github.com/miso-develop/opniz-arduino-m5atom)
	* M5ATOM向けArduinoライブラリ
* [opniz Arduino Library for ESP32](https://github.com/miso-develop/opniz-arduino-esp32)
	* ESP32向けArduinoライブラリ
* [opniz Server](https://github.com/miso-develop/opniz-server)
	* opniz Node.js SDKやopnizデバイスからのJSON RPCメッセージを中継するWebSocketサーバ



## ライセンス

[MIT](./LICENSE)
