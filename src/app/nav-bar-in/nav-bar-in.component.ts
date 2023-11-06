import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar-in',
  templateUrl: './nav-bar-in.component.html',
  styleUrls: ['./nav-bar-in.component.css']
})
export class NavBarInComponent {
  constructor(
    private router: Router) { }
  homeNavigate() {
    this.router.navigateByUrl('');
  }
  aboutNavigate(){
    this.router.navigateByUrl('/about-page');
  }
}
