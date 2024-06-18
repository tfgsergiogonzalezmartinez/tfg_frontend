import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../../../Services/User.service";

export const adminGuard: CanActivateFn = (route, state) => {

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
