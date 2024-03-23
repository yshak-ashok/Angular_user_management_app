import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField,MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Users } from '../../Store/Model/user.model';
import { beginRegister, duplicateUser } from '../../Store/User/user.actions';
import { showAlert } from '../../Store/Common/app.action';
import { RouterLink } from '@angular/router';
import { isDuplicateUser } from '../../Store/User/user.selectors';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCard,MatCardHeader,MatCardContent,MatFormField,MatLabel,MatInput,MatCardActions,MatButton,MatButtonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private store:Store,private builder:FormBuilder){}
  
  registerForm!:FormGroup;
  ngOnInit(){
      this.registerForm=new FormGroup({
        name:new FormControl(null,[Validators.required,Validators.minLength(5)]),
        email:new FormControl(null,[Validators.required,Validators.email]),
        password:new FormControl(null,Validators.required),
        confirmpassword:new FormControl(null,Validators.required),
        phone:new FormControl(null,[Validators.required]),
      })
  }

  proceedRegister(){
    
    if(this.registerForm.valid){
      console.log(this.registerForm);
      if(this.registerForm.value.password === this.registerForm.value.confirmpassword ){
        const userData:Users = {
          name:this.registerForm.value.name as string,
          email:this.registerForm.value.email as string,
          password:this.registerForm.value.password as string,
          phone:this.registerForm.value.phone as string,
          role:'user'
        }
        this.store.dispatch(beginRegister({userData:userData}));
       
        
      }else{
        console.log('fail');
        this.store.dispatch(showAlert({message:'Password Mismatch',resultType:'fail'}))
      }
    }
  }

  duplicateUserFtn(){
    console.log('duplicate');
    
    const email = this.registerForm.value.email as string;
    if(email !== null){
      this.store.dispatch(duplicateUser({userEmail:email}));
      this.store.select(isDuplicateUser).subscribe((item)=>{
        const isExist = item;
        console.log(isExist);
        if(isExist){
          this.registerForm.controls['email'].reset();
          // setTimeout(() => {
          //   window.location.reload(); // Reload the page after two seconds
          // }, 3000);
        }
      })
    }
  }
}
