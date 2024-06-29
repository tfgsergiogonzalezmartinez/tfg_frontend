import { Message } from "../ChatDto/Message";

export interface PeticionSoporteGetDto {
  UsuarioPeticionario : string;
  SolucionadoByAdmin : string;
  Abierta : boolean;
  Mensajes : Message[];
}
