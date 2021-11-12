import { Esp32, Protocol } from "./Esp32";
export { RpcRequest, Protocol } from "./Esp32";
export declare class M5Atom extends Esp32 {
    dis: Dis;
    Btn: Btn;
    IMU: Imu;
    private _checkColorCode;
    onbutton: ((params?: string[]) => void | Promise<void>);
    constructor({ address, port, serverPort, protocol }: {
        address?: string;
        port: number;
        serverPort?: number;
        protocol?: Protocol;
    });
    begin(SerialEnable?: boolean, I2CEnable?: boolean, DisplayEnable?: boolean): Promise<boolean>;
    update(): Promise<boolean>;
}
declare class Dis {
    private opniz;
    constructor(opniz: Esp32);
    setBrightness(brightness: number): Promise<boolean>;
    drawpix(Number: number, Color: string): Promise<boolean>;
    clear(): Promise<boolean>;
}
declare class Btn {
    private opniz;
    constructor(opniz: Esp32);
    read(): Promise<number>;
    isPressed(): Promise<number>;
    isReleased(): Promise<number>;
    wasPressed(): Promise<number>;
    wasReleased(): Promise<number>;
    pressedFor(ms: number): Promise<number>;
    releasedFor(ms: number): Promise<number>;
    wasReleasefor(ms: number): Promise<number>;
    lastChange(): Promise<number>;
}
declare class Imu {
    private opniz;
    constructor(opniz: Esp32);
    init(): Promise<number>;
    getAccelAdc(): Promise<number[]>;
}
//# sourceMappingURL=M5Atom.d.ts.map