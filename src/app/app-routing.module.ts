import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {SignupPageComponent} from "./signup-page/signup-page.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserDetailsEditComponent} from "./user-details-edit/user-details-edit.component";
import {HomeComponent} from "./home/home.component";
import {AboutPageComponent} from "./about-page/about-page.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login-page', component: LoginPageComponent },
  { path: 'signup-page', component: SignupPageComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'user-details-edit/:id', component: UserDetailsEditComponent },
  { path: 'about-page', component: AboutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
