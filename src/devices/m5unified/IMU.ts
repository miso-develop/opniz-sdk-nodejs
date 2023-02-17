import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:

export class IMU {
	public ImuType = ImuType
	public ImuTypeList = ImuTypeList
	
	constructor(private opniz) {}
	
	public async begin(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Imu.begin():bool")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getAccel(): Promise<number[] | undefined> {
		const result = await this.opniz.exec("_M5.Imu.getAccel(float*,float*,float*):bool")
		return result === undefined ? undefined : JSON.parse(result)
	}
	
	public async getGyro(): Promise<number[] | undefined> {
		const result = await this.opniz.exec("_M5.Imu.getGyro(float*,float*,float*):bool")
		return result === undefined ? undefined : JSON.parse(result)
	}
	
	public async getTemp(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Imu.getTemp(float*):bool")
		return result === undefined ? undefined : Number(result)
	}
	
	public async isEnabled(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Imu.isEnabled(void):bool")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getType(): Promise<IMU.ImuTypeList | undefined> {
		const result = await this.opniz.exec("_M5.Imu.getType(void):imu_t")
		return result === undefined ? undefined : ImuTypeList[Number(result)]
	}
	
	public async setRotation(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Imu.setRotation(uint_fast8_t):void")
		return result === undefined ? undefined : Boolean(result)
	}
}

const ImuType = {
	"imu_unknown": 0,
	"imu_sh200q": 1,
	"imu_mpu6050": 2,
	"imu_mpu6886": 3,
	"imu_mpu9250": 4,
} as const

const ImuTypeList: { [key: number]: string } = Object.entries(ImuType).reduce((obj, entry) => ({ ...obj, [entry[1]]: entry[0] }), {})

export namespace IMU {
	export type ImuType = typeof ImuType[keyof typeof ImuType]
	export type ImuTypeList = typeof ImuTypeList[keyof typeof ImuTypeList]
}
