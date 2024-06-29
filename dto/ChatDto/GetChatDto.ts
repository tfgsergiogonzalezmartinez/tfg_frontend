import { EntidadGetDto } from "../EntidadGetDto";
import { Message } from "./Message";

export interface GetChatDto extends EntidadGetDto {

  UserIds: string[];
  Mensajes: Message[];
  Abierto: boolean;
}
