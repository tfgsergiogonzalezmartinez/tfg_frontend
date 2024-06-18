import { EntidadGetDto } from "../EntidadGetDto";

export interface UserGetDto extends EntidadGetDto {
  Email : string;
  Nombre : string;
  Apellido1: string;
  Apellido2: string;
  FechaNamimiento: Date;
  Rol : string;
}
