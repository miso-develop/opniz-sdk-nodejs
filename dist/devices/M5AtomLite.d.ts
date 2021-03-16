import { Esp32Pico } from "./Esp32Pico";
import { MessageHandler } from "./BaseDevice";
export declare class M5AtomLite extends Esp32Pico {
    protected _name: string;
    onbutton: () => void;
    protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void;
    drawpix(number: number, color: string): Promise<boolean>;
}
