import { BaseDevice } from "./base/BaseDevice";
export declare class Esp32 extends BaseDevice {
    getDeviceName(): Promise<string>;
    getFreeHeap(): Promise<number>;
    temperatureRead(): Promise<number>;
    restart(): Promise<boolean>;
    delay(ms: number): Promise<boolean>;
    analogRead(pin: number): Promise<number>;
    dacWrite(pin: number, value: number): Promise<boolean>;
    digitalRead(pin: number): Promise<number>;
    digitalWrite(pin: number, val: number): Promise<boolean>;
    ledcWrite(pin: number, duty: number, channel?: number, freq?: number, resolutionBits?: number): Promise<boolean>;
}
