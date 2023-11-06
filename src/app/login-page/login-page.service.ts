import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  private url = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {
  }

  /**
   * Sends a POST request to the backend server to read user data.
   * @param email
   * @param password The user password.
   * @returns An Observable that emits the response from the server.
   */
  read(email?: string, password?: string): Observable<any> {
    const data = {
      email: email,
      password: password
    };
    return this.http.post(this.url, data);
  }
}

