import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guard/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authAdminGuard } from './guard/auth-admin.guard';

export const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:AdminDashboardComponent,canActivate:[authAdminGuard]},
  {path:'**',redirectTo:'login'}
];
