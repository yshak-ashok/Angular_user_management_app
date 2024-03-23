import { NgIf } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { userInfo } from '../../Store/Model/user.model';
import { UserService } from '../../Services/user.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbar,MatIcon,MatDrawerContainer,MatDrawer,MatNavList,MatListItem,MatDrawerContent,RouterOutlet,NgIf,RouterLink,MatButton],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  isMenuVisible: boolean = false;
  isAdmin: boolean = false;
  constructor(private router: Router, private service: UserService) {}
  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    const route = this.router.url;
    if (route === '/login' || route === '/register') {
      this.isMenuVisible = false;
    } else {
      const userData:userInfo = this.service.getUserDataFromStorage();
      if(userData.role === 'admin'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      this.isMenuVisible = true;
    }
  }
}
