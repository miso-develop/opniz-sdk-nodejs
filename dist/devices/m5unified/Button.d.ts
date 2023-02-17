import { RpcHandler } from "../base/RpcHandlerExtension";
export declare class Button {
    private opniz;
    ButtonType: {
        readonly BtnA: 1;
        readonly BtnB: 2;
        readonly BtnC: 4;
        readonly BtnPWR: 8;
        readonly BtnExt: 16;
    };
    ButtonTypeList: {
        [key: number]: string;
    };
    onClicked: ((button: Button.ButtonTypeList, count: number) => void | Promise<void>);
    onDeciedClickCount: ((button: Button.ButtonTypeList, count: number) => void | Promise<void>);
    onSingleClicked: ((button: Button.ButtonTypeList) => void | Promise<void>);
    onDoubleClicked: ((button: Button.ButtonTypeList) => void | Promise<void>);
    onHold: ((button: Button.ButtonTypeList) => void | Promise<void>);
    rpcHandlers: RpcHandler[];
    constructor(opniz: any);
    private _convertButtonType;
    setDebounceThresh(msec: number): Promise<boolean | undefined>;
    setHoldThresh(msec: number): Promise<boolean | undefined>;
    getDebounceThresh(): Promise<number | undefined>;
    getHoldThresh(): Promise<number | undefined>;
}
declare const ButtonType: {
    readonly BtnA: 1;
    readonly BtnB: 2;
    readonly BtnC: 4;
    readonly BtnPWR: 8;
    readonly BtnExt: 16;
};
declare const ButtonTypeList: {
    [key: number]: string;
};
export declare namespace Button {
    type ButtonType = typeof ButtonType[keyof typeof ButtonType];
    type ButtonTypeList = typeof ButtonTypeList[keyof typeof ButtonTypeList];
}
export {};
