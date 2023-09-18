export interface MessageChannel<T> {
  channel: T;
  sendMessage(event: string, payload: string): void;
}
