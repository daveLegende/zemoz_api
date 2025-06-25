export interface IEvent {
    connect(): Promise<void>;
    publish(queue: string, message: any): Promise<void>;
    subscribe(queue: string, callback: (message: any) => void): void;
    disconnect(): Promise<void>;
}
