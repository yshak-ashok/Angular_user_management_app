import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { userInfo } from '../Store/Model/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);
  const userinfo:userInfo=service.getUserDataFromStorage();
  //console.log('userinfo',userinfo._id);
  if(userinfo._id!='' && userinfo._id !=null){
    return true
  }else{
    router.navigate(['login'])
    return false
  }
  
};
