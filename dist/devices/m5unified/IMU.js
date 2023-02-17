"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMU = void 0;
class IMU {
    constructor(opniz) {
        this.opniz = opniz;
        this.ImuType = ImuType;
        this.ImuTypeList = ImuTypeList;
    }
    begin() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.begin():bool");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getAccel() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.getAccel(float*,float*,float*):bool");
            return result === undefined ? undefined : JSON.parse(result);
        });
    }
    getGyro() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.getGyro(float*,float*,float*):bool");
            return result === undefined ? undefined : JSON.parse(result);
        });
    }
    getTemp() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.getTemp(float*):bool");
            return result === undefined ? undefined : Number(result);
        });
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.isEnabled(void):bool");
            return result === undefined ? undefined : Boolean(result);
        });
    }
    getType() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.getType(void):imu_t");
            return result === undefined ? undefined : ImuTypeList[Number(result)];
        });
    }
    setRotation() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.opniz.exec("_M5.Imu.setRotation(uint_fast8_t):void");
            return result === undefined ? undefined : Boolean(result);
        });
    }
}
exports.IMU = IMU;
const ImuType = {
    "imu_unknown": 0,
    "imu_sh200q": 1,
    "imu_mpu6050": 2,
    "imu_mpu6886": 3,
    "imu_mpu9250": 4,
};
const ImuTypeList = Object.entries(ImuType).reduce((obj, entry) => (Object.assign(Object.assign({}, obj), { [entry[1]]: entry[0] })), {});
