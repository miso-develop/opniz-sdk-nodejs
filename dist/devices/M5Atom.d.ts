import { Esp32 } from "./Esp32";
import { MessageHandler } from "./BaseDevice";
export declare class M5Atom extends Esp32 {
    protected _name: string;
    onbutton: () => void;
    protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void;
    drawpix(number: number, color: string): Promise<boolean>;
}
