import { Message } from "../ChatDto/Message";
import { EntidadGetDto } from "../EntidadGetDto";

export interface PeticionSoporteGetDto extends EntidadGetDto {
  UsuarioPeticionario : string;
  SolucionadoByAdmin : string;
  Abierta : boolean;
  Mensajes : Message[];
}
