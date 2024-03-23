import { Component, NgModule, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Associate } from '../../Store/Model/associate.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
  deleteUser,
  getEditUser,
  loadAssociate,
  openPopup,
} from '../../Store/Associate/associate.actions';
import { getAssociateList } from '../../Store/Associate/associate.selectors';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddUserComponent } from '../add-user/add-user.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatHeaderRowDef,
    MatRowDef,
    MatTable,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatIcon,
    MatMiniFabButton,
    FormsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  AssociateList!: Associate[];
  SearchAssociateList!:Associate[];
  searchQuery:string = '';
  dataSource: any;
  displayedColums: string[] = ['name', 'email', 'phone', 'action'];

  constructor(private dialog: MatDialog, private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe((item) => {
      this.AssociateList = item
      this.SearchAssociateList = item;
      console.log('list of associate',this.AssociateList);
    });
  }

  addUser() {
    this.OpenPopup(0, 'Create User');
  }
  applySearch(){
    const text = this.searchQuery.trim().toLocaleLowerCase();
    this.AssociateList = this.SearchAssociateList.filter((user)=>{
      const userName = user.name.toLocaleLowerCase();
      return userName.includes(text);
      
    
    })  
    console.log(this.AssociateList);
  }

  OpenPopup(code: number, title: string) {
    this.store.dispatch(openPopup());
    this.dialog.open(AddUserComponent, {
      width: '40%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: {
        code: code,
        title: title,
      },
    });
  }

  // Delete user
  deleteUser(userId: string) {
    if (confirm('Do you want to remove?')) {
      this.store.dispatch(deleteUser({ id: userId }));
    }
  }

  //edit user
  editUser(userId:string){
    this.OpenPopup(0,'Edit User');
    this.store.dispatch(getEditUser({id:userId}));
  }

}
