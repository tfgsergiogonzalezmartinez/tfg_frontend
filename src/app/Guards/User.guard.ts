import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../../../Services/User/User.service";

export const UserGuard: CanActivateFn = (route, state) => {
  //proteccion usuario
  const service=inject(UserService);

  if (!service.isLogin()) {
    inject(Router).navigate(['']);
    return false;
  }
  if (!service.isUser()){
    inject(Router).navigate(['']);
    return false;
  }
  return true;
};
