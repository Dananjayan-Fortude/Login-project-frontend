import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {LoginPageService} from "./login-page.service";
import {Router} from "@angular/router";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  message: string | undefined;
  error: string | undefined;
  hideAlert: boolean = true;
  alertMessage: string | undefined;
  alertType: string = "";
  userEmail: string | undefined;
  userPass: string | undefined;

  constructor(
    private toast: ToastrService,
    private service: LoginPageService,
    private router: Router,
    private tokenService: TokenService) {
  }

  emailInput(eventData: any) {
    this.userEmail = eventData.target.value;
  }

  passwordInput(eventData: any) {
    this.userPass = eventData.target.value;
  }

  loginFunc() {
    const accessToken = localStorage.getItem('accessToken');
    // @ts-ignore
    this.tokenService.addToken(accessToken);
    this.hideAlert = false;
    this.service.read(this.userEmail, this.userPass).subscribe(
      (response: any) => {
        // Check if the response contains an error property
        if (response.message === 'Unauthorized') {
          this.error = response.message || 'Unknown error occurred';
          this.alertType = "alert alert-danger";
          this.alertMessage = this.error;
        }
        // If no error, consider it a successful login
        else {
          this.message = response.message; // Update the message property with the message from the response
          this.alertType = "alert alert-success";
          this.alertMessage = "Wait, you will be logged in...";
          this.toast.success('You are an authorized user', 'Success', {
            timeOut: 3000,
            progressBar: true,
          });

          // Store the access token in local storage
          localStorage.setItem('accessToken', response.access_token);

          // Redirect to the details page after a delay
          setTimeout(() => {
            this.router.navigate(['/user-details']);
          }, 4000);
        }
      },
      (error: any) => {
        this.error = error.error.message || 'Unknown error occurred';
        this.alertType = "alert alert-danger";
        this.alertMessage = this.error;
      }
    );
  }
}

