import { UserGetDto } from "./UserGetDto";

export interface UserLoginGetDto extends UserGetDto{
  Token: string;
}
