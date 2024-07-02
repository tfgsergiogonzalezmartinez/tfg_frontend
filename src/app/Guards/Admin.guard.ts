import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../../../Services/User/User.service";

export const adminGuard: CanActivateFn = (route, state) => {
  //proteccion administrador
  const service=inject(UserService);
  if (!service.isAdmin()){
    inject(Router).navigate(['']);
    return false;
  }
  return true;
};
