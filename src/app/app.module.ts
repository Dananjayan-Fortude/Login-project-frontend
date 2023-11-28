import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserDetailsEditComponent } from './user-details-edit/user-details-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavBarInComponent } from './nav-bar-in/nav-bar-in.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AboutPageComponent } from './about-page/about-page.component';
import { PayloadOutComponent } from './payload-out/payload-out.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    UserDetailsEditComponent,
    UserDetailsComponent,
    NavBarComponent,
    NavBarInComponent,
    HomeComponent,
    AboutPageComponent,
    PayloadOutComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        NgxPaginationModule,
        TableModule,
        ButtonModule,
        RippleModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
