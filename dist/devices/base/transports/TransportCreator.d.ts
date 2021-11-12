import { Transport, Protocol } from "./Transport";
export declare class ConstructorParameterError extends Error {
    constructor(message?: string);
}
export declare class TransportCreator {
    static create({ address, port, serverPort, protocol }: {
        address?: string;
        port: number;
        serverPort?: number;
        protocol?: Protocol;
    }): Transport;
}
//# sourceMappingURL=TransportCreator.d.ts.map