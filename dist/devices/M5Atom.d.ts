import { Esp32 } from "./Esp32";
export declare class M5Atom extends Esp32 {
    dis: Dis;
    Btn: Btn;
    IMU: Imu;
    private _checkColorCode;
    onbutton: ((params?: string[]) => void | Promise<void>);
    protected init(): void;
    begin(SerialEnable?: boolean, I2CEnable?: boolean, DisplayEnable?: boolean): Promise<boolean>;
    update(): Promise<boolean>;
}
export declare class Dis {
    private opniz;
    constructor(opniz: Esp32);
    setBrightness(brightness: number): Promise<boolean>;
    drawpix(Number: number, Color: string): Promise<boolean>;
    fillpix(Color: string): Promise<boolean>;
    clear(): Promise<boolean>;
    setWidthHeight(xColumns: number, yRows: number): Promise<boolean>;
}
export declare class Btn {
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
export declare class Imu {
    private opniz;
    constructor(opniz: Esp32);
    init(): Promise<number>;
    getAccelAdc(): Promise<number[]>;
}
