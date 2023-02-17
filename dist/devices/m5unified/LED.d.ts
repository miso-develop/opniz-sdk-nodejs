export declare class LED {
    private opniz;
    constructor(opniz: any);
    init(): Promise<boolean | undefined>;
    setBrightness(brightness: number): Promise<boolean | undefined>;
    drawpix(Number: number, Color: LED.Color): Promise<boolean | undefined>;
    drawpix(xpos: number, ypos: number, Color: LED.Color): Promise<boolean | undefined>;
    fillpix(Color: LED.Color): Promise<boolean | undefined>;
    clear(): Promise<boolean | undefined>;
    setWidthHeight(xColumns: number, yRows: number): Promise<boolean | undefined>;
}
export declare namespace LED {
    type Color = string | number;
}
