import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { userCredential } from '../../Store/Model/user.model';
import { beginLogin } from '../../Store/User/user.actions';
import { RegisterComponent } from '../register/register.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButton,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) {}
  loginForm!: FormGroup;

  ngOnInit(): void {
    localStorage.clear()
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      const userCredential: userCredential = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.store.dispatch(beginLogin({ userCredential: userCredential }));
    }
  }
}
