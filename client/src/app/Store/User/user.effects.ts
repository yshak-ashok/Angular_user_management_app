import { Injectable } from "@angular/core";
import { UserService } from "../../Services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { beginLogin, beginRegister, duplicateUser, duplicateUserSuccess, uploadUserImage } from "./user.actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showAlert } from "../Common/app.action";


@Injectable()
export class UserEffect{

  constructor(private actions$:Actions,private service:UserService,private route:Router){}

  _registerUser$ = createEffect(()=>
  
     this.actions$.pipe(
        ofType(beginRegister),
        exhaustMap(action=>{
           return this.service.registerUser(action.userData).pipe(
              map((data)=>{
                 this.route.navigate(['login']);
                 return showAlert({message:'Registration Successfull',resultType:'pass'})
                 
              }),
              catchError((_error)=>of(showAlert({message:'Registration Fail',resultType:'fail'})))
           )
        })
     )
  )


  _loginUser = createEffect(()=>
      this.actions$.pipe(
         ofType(beginLogin),
         exhaustMap((action)=>{
            console.log(action.userCredential);
            return this.service.loginUser(action.userCredential).pipe(
               map((data)=>{
                  const _userData = data;
                  console.log('login data',_userData);
                  
                  if(_userData.length > 0){
                     this.service.setUserToLocalStorage(_userData[0]);
                     localStorage.setItem('token',JSON.stringify(_userData[1]));
                     this.route.navigate([''])
                     return showAlert({message:'Login Successfull',resultType:'pass'});
                  }else{
                     console.log('loginfail');
                     return showAlert({message:'Invalid User',resultType:'fail'});
                  }
               }),
               catchError((_error)=>of(showAlert({message:'Login Failed', resultType:'fail'})))
            )
         })
      )
   )
   

   _duplicateEmail=createEffect(()=>this.actions$.pipe(ofType(duplicateUser),
   switchMap(action=>{
      return this.service.duplicateEmail(action.userEmail).pipe(
         switchMap((data)=>{
            console.log('data suplicate',data);
            
            if(data.length>0){
               return of(duplicateUserSuccess({isDuplicate:true}),showAlert({message:'Email Already Exists',resultType:'fail'}))
            }else{
               return of(duplicateUserSuccess({isDuplicate:false}))
            }
         }),
         catchError((_error)=>of(showAlert({message:'Registration Fail',resultType:'fail'})))
      )
   })))

   

   _uploadImage$ = createEffect(()=>
      this.actions$.pipe(
         ofType(uploadUserImage),
         exhaustMap(action=>{
            console.log('actiondata',action.data);
            
            return this.service.uploadProfile(action.data).pipe(
               map(data=>{
                  const existing = localStorage.getItem('userData') as string;
                  const existingData = JSON.parse(existing)
                  existingData.image = data;
                  localStorage.setItem('userData',JSON.stringify(existingData));
                  return (showAlert({message:'Profile picture updated',resultType:'pass'}))
               }),
               catchError((_error)=>of(showAlert({message:'Image not uploaded',resultType:'fail'})))
            )
         })
      )
   )
}