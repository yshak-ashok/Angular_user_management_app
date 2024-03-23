import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, userCredential, userInfo } from '../Store/Model/user.model';
import { userBaseUrl } from '../serverUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserTokenFromStorage() {
    return window.localStorage.getItem('token');
  }
 
  constructor(private http:HttpClient) { }

  // Setting user data in to local storage
  setUserToLocalStorage(userData:userInfo){
    localStorage.setItem('userData',JSON.stringify(userData));
  }
  getUserDataFromStorage(){
    let _data:userInfo={
      _id:'',
      name:'',
      email:'',
      role:'',
    }
    
    if(localStorage.getItem('userData') !== null){
      let jsonString = localStorage.getItem('userData') as string;
      
      _data = JSON.parse(jsonString);
      return _data;
    }else{
      return _data;
    }
  }

  
  registerUser(userData:Users):Observable<Users>{
    return this.http.post<Users>(`${userBaseUrl}/userSignUp`,userData);
  }
  loginUser(userCredential:userCredential):Observable<userInfo[]>{
    return this.http.post<userInfo[]>(`${userBaseUrl}/userSignIn`,userCredential);
  }
  uploadProfile(data:FormData):Observable<userInfo>{
    return this.http.post<userInfo>(`${userBaseUrl}/uploadImage`,data);
  }
  duplicateEmail(userEmail:string):Observable<userCredential[]>{
    console.log('hai duplicate email clientside');
    
    return this.http.get<userCredential[]>(`${userBaseUrl}/duplicateEmail/?email=${userEmail}`);
  }
  

}
