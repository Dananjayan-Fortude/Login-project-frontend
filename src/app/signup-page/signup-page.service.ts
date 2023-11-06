import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private url = 'http://localhost:8080/users/signup';

  constructor(private http: HttpClient) {}

  // Method to create a new user
  create(name?: string, email?: string, password?: string): Observable<any> {
    const body = {
      name: name,
      email: email,
      password: password
    };
    // Send a POST request to the backend API with the user data
    return this.http.post(this.url, body);
  }
}
