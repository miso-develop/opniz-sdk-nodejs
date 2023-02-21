import { BaseDevice, ConstructorParameter } from "./base/BaseDevice";
export { ConstructorParameter };
export declare class Esp32 extends BaseDevice {
    getVersion(): Promise<string | undefined>;
    getFreeHeap(): Promise<number | undefined>;
    temperatureRead(): Promise<number | undefined>;
    restart(): Promise<boolean | undefined>;
    delay(ms: number): Promise<boolean | undefined>;
    analogRead(pin: number): Promise<number | undefined>;
    digitalRead(pin: number): Promise<number | undefined>;
    digitalWrite(pin: number, val: number): Promise<boolean | undefined>;
    ledcWrite(pin: number, duty: number, channel?: number, freq?: number, resolutionBits?: number): Promise<boolean | undefined>;
    pinMode(pin: number, mode: number): Promise<boolean | undefined>;
    ledcSetup(chan: number, freq: number, bitNum: number): Promise<number | undefined>;
    ledcAttachPin(pin: number, chan: number): Promise<boolean | undefined>;
    ledcDetachPin(pin: number): Promise<boolean | undefined>;
}
