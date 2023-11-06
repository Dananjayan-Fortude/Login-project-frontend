import { Component } from '@angular/core';
import {SignupService} from "./signup-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  constructor(
    private service: SignupService,
    private router: Router) {
  }

  message: string | undefined;
  error: string | undefined;
  hideAlert: boolean = true;
  alertMessage: string | undefined;
  alertType: string = "";
  userName: string | undefined;
  userEmail: string | undefined;
  userPass: string | undefined;

  nameInput (eventData: any) {
    this.userName = eventData.target.value;
  }

  emailInput (eventData: any) {
    this.userEmail = eventData.target.value;
  }

  passInput (eventData: any) {
    this.userPass = eventData.target.value;
  }

  signUp(){
    this.service.create(this.userName, this.userEmail, this.userPass).subscribe(
      (response: any) => {
        if (response.message === 'success') {
          this.message = response.message; // Update the message property with the message from the response

          // Show a success message and navigate to the login page
          this.alertType = 'alert alert-success';
          this.hideAlert = false;
          let countdown = 5;
          const countdownInterval = setInterval(() => {
            this.alertMessage = `${this.message} You will be returned to the login page in ${countdown} seconds`;
            countdown--;
            if (countdown === 0) {
              clearInterval(countdownInterval);
              this.router.navigate(['/login-page']);
            }
          }, 1000);
        } else {
          this.error = response.message || 'Unknown error occurred'; // Set the error property with the error from the response or set a generic error message
          this.alertType = 'alert alert-danger';
          this.hideAlert = false;
          this.alertMessage = this.error;
        }
      },
      (error: any) => {
        this.error = error.error.message;
        this.alertType = 'alert alert-danger';
        this.hideAlert = false;
        this.alertMessage = this.error;
      }
    );
  }
}
