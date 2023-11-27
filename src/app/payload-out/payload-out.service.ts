import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayloadOutService {

  private url = 'http://localhost:3000/database/errorpayload/';
  private url2 = 'http://localhost:3000/database/query/';
  constructor(private http: HttpClient) { }

  payload(displayHeaderId: string): Observable<any> {
    return this.http.get(this.url + displayHeaderId);
  }
  query(displayHeaderId: string): Observable<any> {
    return this.http.get(this.url2 + displayHeaderId);
  }
}
