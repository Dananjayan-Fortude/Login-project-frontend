import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) { }

  loginNavigate() {
    this.router.navigateByUrl('/login-page');
  }

  homeNavigate() {
    this.router.navigateByUrl('');
  }

  signupNavigate() {
    this.router.navigateByUrl('/signup-page');
  }

  aboutNavigate(){
    this.router.navigateByUrl('/about-page');
  }
}
