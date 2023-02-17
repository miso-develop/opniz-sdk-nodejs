export declare class IMU {
    private opniz;
    ImuType: {
        readonly imu_unknown: 0;
        readonly imu_sh200q: 1;
        readonly imu_mpu6050: 2;
        readonly imu_mpu6886: 3;
        readonly imu_mpu9250: 4;
    };
    ImuTypeList: {
        [key: number]: string;
    };
    constructor(opniz: any);
    begin(): Promise<boolean | undefined>;
    getAccel(): Promise<number[] | undefined>;
    getGyro(): Promise<number[] | undefined>;
    getTemp(): Promise<number | undefined>;
    isEnabled(): Promise<boolean | undefined>;
    getType(): Promise<IMU.ImuTypeList | undefined>;
    setRotation(): Promise<boolean | undefined>;
}
declare const ImuType: {
    readonly imu_unknown: 0;
    readonly imu_sh200q: 1;
    readonly imu_mpu6050: 2;
    readonly imu_mpu6886: 3;
    readonly imu_mpu9250: 4;
};
declare const ImuTypeList: {
    [key: number]: string;
};
export declare namespace IMU {
    type ImuType = typeof ImuType[keyof typeof ImuType];
    type ImuTypeList = typeof ImuTypeList[keyof typeof ImuTypeList];
}
export {};
