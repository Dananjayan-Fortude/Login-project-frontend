import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsEditService {
  private url = 'http://localhost:8080/users/update';

  constructor(private http: HttpClient) {
  }

  update(id: number, name?: string, email?: string, password?: string): Observable<any> {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });
    const data = {
      id: id,
      name: name,
      email: email,
      password: password
    };
    return this.http.post(this.url, data, { headers });
  }
}
