import { PeticionSoporteGetDto } from "../../dto/SoporteDto/PeticionSoporteGetDto";
import { UserGetDto } from "../../dto/UserDto/UserGetDto";

export interface ChatUsuariosBuscados {
  User: UserGetDto;
  Imagen: string;
  MensajesNoLeidos: number;
  Peticion?: PeticionSoporteGetDto;
  MostrarOpciones? : boolean;
}
