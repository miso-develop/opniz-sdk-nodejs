import dayjs from "dayjs"
import chalk from "chalk"

export { dayjs, chalk }

export const getDateStr = () => dayjs().format("YYYY/MM/DD HH:mm:ss")

// export const log = (...v) => console.log(...v)
export const log = (...v: any[]): void => console.log(`${getDateStr()} ${v.join(" ")}`)

export const sleep = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))
export const wait = sleep

export const zeroPadding = (value: string, length: number): string => ("0".repeat(length) + value).slice(-length)

export const generateRandomColorcode = (): string => {
	const createRandomByte = (): string => zeroPadding(Math.floor(Math.random() * 255).toString(16), 2)
	const createRandomBit = (): number => Math.round(Math.random())
	const getFF00 = (bit: number): string => bit === 1 ? "ff" : "00"
	const randomColor = `${getFF00(createRandomBit())}${getFF00(createRandomBit())}${getFF00(createRandomBit())}`
	return `#${randomColor === "000000" ? "ffffff" : randomColor}`
}

export const generateRandomColorcodeClosure = () => {
	let color
	let preColor = color = "#ffffff"
	return () => {
		while (color === preColor) color = generateRandomColorcode()
		preColor = color
		return color
	}
}
