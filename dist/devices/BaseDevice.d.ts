import { TcpManager, MessageHandler, Message } from "./lib/TcpManager";
export { MessageHandler, Message } from "./lib/TcpManager";
export declare abstract class BaseDevice extends TcpManager {
    protected abstract _name: string;
    protected abstract addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void;
    requestJson(messageJson: Message | Message[]): Promise<string>;
    sendJson(messageJson: Message | Message[]): Promise<void>;
    exec(name: string, ...parameters: any): Promise<any>;
    createMessage(name: string, ...parameters: any): Message;
    get name(): string;
}
