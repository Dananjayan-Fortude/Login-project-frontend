import {Component} from '@angular/core';
import {UserDetailsService} from "./user-details.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TableLazyLoadEvent} from "primeng/table";
import {TokenService} from "../token.service";
import {Users} from "./user-details.models";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  details: Users[] = [];
  totalRecords: number = 0;

  constructor(
    private toast: ToastrService,
    private userService: UserDetailsService,
    private router: Router,
    private tokenService: TokenService) {
  }

  loadUsers($event: TableLazyLoadEvent) {
    const accessToken = localStorage.getItem('accessToken');
    const tokens = this.tokenService.getTokens();
    let found = false;
    for (let token in this.tokenService.getTokens()) {
      if (token === accessToken) {
        found = true;
        console.log('found');
        break;
      }
    }
    if (found) {
      this.toast.error('Login to view this page', 'Unauthorized', {
        timeOut: 3000,
        progressBar: true,
      });
    } else {
      this.userService.getAll($event.first || 0).subscribe(
        (response: any) => {
          this.details = response.users;
          this.totalRecords = response.total.value;
        }, error => {
          this.toast.error(`${error.error.message} login again`, 'Time out', {
            timeOut: 3000,
            progressBar: true,
          });
        }
      )
    }
  }

  editButtonClick(details: any) {
    this.router.navigate(['/user-details-edit', details.id]);
  }

  dltButtonClick(details: any) {
    //console.log(details.id);
    this.userService.delete(details.id).subscribe(
      () => {
        // The deletion was successful
        console.log('Deletion success');
        location.reload();
      },
      (error) => {
        console.log(error.error.statusCode);
        // An error occurred during deletion
        //console.error('Error occurred:', error);
        // if (error.error.statusCode === 403 || error.error.message === 'Forbidden resource') {
        //   // Handle the "Forbidden resource" error specifically
        //   console.log('Forbidden resource error');
        //   this.toast.error('YOU DO NOT HAVE ACCESS TO DELETE', error.error.message, {
        //     timeOut: 3000,
        //     progressBar: true,
        //   });
      }
    );
  }


}

