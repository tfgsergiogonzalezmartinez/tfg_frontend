import { Message } from "./Message";

export interface CreateChatDto {
  UserIds: string[];
  Messages: Message[];
  Abierto: boolean;
}
