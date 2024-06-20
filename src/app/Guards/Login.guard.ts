import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../../../Services/User/User.service";

export const loginGuard: CanActivateFn = (route, state) => {
  //proteccion de login
  const userService=inject(UserService);
  if (!userService.isLogin()) {
    inject(Router).navigate(['']);
    return false;
  }
  return true;
};
