import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayloadOutService {

  private url = 'http://localhost/database/errorpayload/';
  private url2 = 'http://localhost/database/query/';
  private url3 = 'http://localhost/database/ExcelGen/';
  private url4 = 'http://localhost/database/payloads/';
  private cpl = 'http://localhost/cpl-update/CPL/work';
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
