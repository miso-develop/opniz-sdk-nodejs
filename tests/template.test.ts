import { env, getPort } from "./env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../src/utils"

// describe("<ClassName>", () => {
describe.skip("<ClassName>", () => {
	
	const _env = env
	
	let xxx
	
	
	
	beforeAll(async () => {
		
	})
	
	beforeEach(async () => {
		
	})
	
	
	
	describe("Methods", () => {
		
		describe("<MethodName>", () => {
			
			test("xxx", async () => {
				// const actual = "xxx"
				// expect(actual).toBe("xxx")
			})
		})
	})
	
	
	
	describe("Properties", () => {
		
		describe("<PropertyName>", () => {
			
			test("xxx", async () => {
				// const actual = "xxx"
				// expect(actual).toBe("xxx")
			})
		})
	})
	
	
	
	afterEach(async () => {
		
	})
	
	afterAll(async () => {
		// await sleep(100)
	})
	
})
