import { BaseDevice, MessageHandler } from "./BaseDevice";
export declare class Esp32 extends BaseDevice {
    protected _name: string;
    protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void;
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
