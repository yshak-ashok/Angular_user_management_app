import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { userInfo } from '../Store/Model/user.model';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const service=inject(UserService)
  const router=inject(Router)
  const userinfo:userInfo=service.getUserDataFromStorage()
  if(userinfo.role ==='admin'){
    return true;
  }else{
    router.navigate(['login'])
    return false
  }
 
};
