import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, delay, Observable, tap, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private url = 'http://localhost:8080/users'; // The base URL fo r the user details API
  private dltUrl = 'http://localhost:8080/users/delete'; // The base URL fo r the user details API
  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    ) {
  }

  getAll(skip: number): Observable<Object> {
    const url = `${this.url}/findAll?skip=${skip}&limit=9`;

    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    // Set the access token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    // Perform a GET request to the specified URL with the headers and return the Observable
    return this.http.get(url, {headers});
  }

  delete(id: number): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const url = `${this.dltUrl}/${id}`;
    console.log(url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });

    return this.http.delete(url, { headers }).pipe(
      // delay(1000),
      tap(() => {
        // Toast message for successful deletion
        this.toast.success('User will be deleted', 'Success', {
          timeOut: 3000,
          progressBar: true,
        });
      }),
      catchError((error) => {
        // Handle the error here
        //console.error('Error occurred:', error);
        // You can also perform additional actions, such as showing an error message
        // or logging the error to a remote service

        // Rethrow the error to propagate it to the subscriber
        return throwError(error);
      }),
      delay(5000), // Add a delay before reloading the page
      tap(() => {
        // Reload the page after the delay
        location.reload();
      })
    );
  }

}
