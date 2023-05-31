import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component:  HomeComponent},
  { path: 'register', component: RegisterComponent}
];