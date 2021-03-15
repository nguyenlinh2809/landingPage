import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpCoreService<T> {

  constructor(protected http: HttpClient) { }

  get(url: string): Observable<ResponseModel<T>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Accept', 'application/json');
    return this.http.get<ResponseModel<T>>(url, { headers });
  }
  post(url: string, body: T): Observable<ResponseModel<T>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Accept', 'application/json');
    return this.http.post<ResponseModel<T>>(url, body, { headers });
  }
  put(url: string, body: T): Observable<ResponseModel<T>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Accept', 'application/json');
    return this.http.put<ResponseModel<T>>(url, body, { headers });
  }
  delete(url: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Accept', 'application/json');
    return this.http.put<ResponseModel<T>>(url, { headers });
  }
  upload(url: string, body) {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<ResponseModel<T>>(url, { headers });
  }
}
