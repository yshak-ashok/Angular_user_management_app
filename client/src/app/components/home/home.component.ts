import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Store } from '@ngrx/store';
import { userInfo } from '../../Store/Model/user.model';
import { uploadUserImage } from '../../Store/User/user.actions';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, DoCheck {
  constructor(private service: UserService, private store: Store) {}

  userData!: userInfo;
  userImage: string = 'assets/images/profile.jpeg';
  showUploadBox: boolean = false;

  ngOnInit(): void {
    this.userData = this.service.getUserDataFromStorage();
    if(this.userData.image){
      this.userImage = this.userData.image;
      console.log('image',this.userImage);
      
    }
  }
  ngDoCheck() {
    this.userData = this.service.getUserDataFromStorage();
    if (this.userData.image) {
      this.userImage = this.userData.image;
    }
  }
  uploadClicked() {
    this.showUploadBox = !this.showUploadBox;
  }

  UploadImage(event: any) {
    this.showUploadBox = !this.showUploadBox;

    const file = event.target.files[0];
    console.log(file)
    if(file){
      const form = new FormData();
      form.append("img",file);
      form.append('id',(this.userData._id)as string);
      console.log('form',form)
      //console.log(this.userData._id);
      
      this.store.dispatch(uploadUserImage({data:form}));
      
    }
  }
}
