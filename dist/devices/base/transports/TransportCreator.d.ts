import { Transport, ConstructorParameter } from "./Transport";
export declare class ConstructorParameterError extends Error {
    constructor(message?: string);
}
export declare class TransportCreator {
    private static _defaultProtocol;
    static create({ address, port, id, serverPort, protocol }: ConstructorParameter): Transport;
}
