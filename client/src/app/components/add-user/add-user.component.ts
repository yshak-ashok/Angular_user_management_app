import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { getEditUser } from '../../Store/Associate/associate.selectors';
import { Associate } from '../../Store/Model/associate.model';
import { addAssociate, updateUser } from '../../Store/Associate/associate.actions';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {

  title: string = 'CREATE NEW USER';
  dialogueData: any;
  userId!: string;
  isEdit: boolean = false;
  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.dialogueData = this.data;
    this.title = this.dialogueData.title;
    this.store.select(getEditUser).subscribe((res) => {
      this.userId = res._id as string;
      if (this.userId) {
        this.isEdit = true;
      }
      this.addUserForm.setValue({
        name: res.name,
        email: res.email,
        phone: res.phone,
        password: res.password,
      });
    });
  }
  addUserForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    phone: this.builder.control('', Validators.required),
  });

  saveNewUser() {
    if (this.addUserForm.valid) {
      let obj: Associate = {
        name: this.addUserForm.value.name as string,
        email: this.addUserForm.value.email as string,
        password: this.addUserForm.value.password as string,
        phone: this.addUserForm.value.phone as string
        
      };
      if (!this.isEdit) {
        this.store.dispatch(addAssociate({ inputData: obj }));
      } else {
        this.store.dispatch(updateUser({ inputData: obj, id: this.userId }));
      }
      this.ClosePopup();
    }
  }
  ClosePopup() {
    this.ref.close();
  }
}
