import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayloadOutService {

  private url = 'http://localhost:3000/database/errorpayload/';
  private url2 = 'http://localhost:3000/database/query/';
  private url3 = 'http://localhost:3000/database/ExcelGen/';
  private url4 = 'http://localhost:3000/database/payloads/';
  private cpl = 'http://localhost:3000/cpl-update/CPL/work';
  constructor(private http: HttpClient) { }

  payload(displayHeaderId: string): Observable<any> {
    return this.http.get(this.url + displayHeaderId);
  }
  query(displayHeaderId: string): Observable<any> {
    return this.http.get(this.url2 + displayHeaderId);
  }
  excelGen(displayHeaderId: string): Observable<any> {
    return this.http.get(this.url3 + displayHeaderId);
  }

  successPayload(displayHeaderId: string): Observable<any> {
    return this.http.get(this.url4 + displayHeaderId);
  }

  cplUpdate(): Observable<any> {
    return this.http.get(this.cpl);
  }
}
