import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDetailsEditService} from "./user-details-edit.service";
import {ToastrService} from "ngx-toastr";
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {
  userId = 0;
  userName: string | undefined;
  userEmail: string | undefined;
  userPassword: string | undefined;
  message: string | undefined;
  error: string | undefined;
  hideAlert: boolean = true;
  alertMessage: string | undefined;
  alertType: string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: UserDetailsEditService,
    private toast: ToastrService,
    private route2: Router) {
  }

  ngOnInit() {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  updateMethod() {
    this.service.update(this.userId, this.userName, this.userEmail, this.userPassword).subscribe(
      (data: any) => {
        console.log(data);
        if (data.message === 'User changed successfully') {
          this.alertMessage = data.message; // Update the message property with the message from the response
          this.error = ''; // Clear the error
          this.alertType = "alert alert-success";
          this.hideAlert = false; // Show the alert box
          this.toast.success(this.userName, 'Updated', {
            timeOut: 3000,
            progressBar: true,
          });
          setTimeout(() => {
            this.route2.navigate(['/user-details']);
          }, 4000);
        } else if (data.error.message === 'Unauthorized') {
          this.alertMessage = data.error.message;
          this.error = data.error.message;
          this.alertType = "alert alert-danger";
          this.hideAlert = false;
        } else {
          this.alertMessage = data.error; // Update the message property with the message from the response
          this.error = ''; // Clear the error
          this.alertType = "alert alert-danger";
          this.hideAlert = false; // Show the alert box
        }
      }
    );
    this.userName = undefined;
    this.userEmail = undefined;
    this.userPassword = undefined;
  }

  nameInput(data: any) {
    this.userName = data.target.value;
    if (this.userName === '') {
      this.userName = undefined;
    }
  }

  emailInput(data: any) {
    this.userEmail = data.target.value;
    if (this.userEmail === '') {
      this.userEmail = undefined;
    }
  }

  passInput(data: any) {
    this.userPassword = data.target.value;
    if (this.userPassword === '') {
      this.userPassword = undefined;
    }
  }
}

