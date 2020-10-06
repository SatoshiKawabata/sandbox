export type MessageType = "start-recording" | "stop-recording";
export interface Message {
  type: MessageType;
}
