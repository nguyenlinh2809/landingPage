import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService<T> {

  baseUrl = environment.BASE_URL;
  URL_GET_LIST = '';
  URL_GET_BY_ID = '';
  URL_CREATE = '';
  URL_DELETE = '';
  URL_UPDATE = '';
  constructor(protected http: HttpClient) { }

  getList(): Observable<ResponseModel<T>> {
    return this.http.get<ResponseModel<T>>(this.URL_GET_LIST);
  }
  getById(id: number): Observable<ResponseModel<T>> {
    const url = this.URL_GET_BY_ID + '/' + id;
    return this.http.get<ResponseModel<T>>(url);
  }
  create(model: T): Observable<ResponseModel<T>> {
    return this.http.post<ResponseModel<T>>(this.URL_CREATE, model);
  }
  update(id: number, model: T): Observable<ResponseModel<T>> {
    const url = this.URL_GET_BY_ID + '/' + id;
    return this.http.put<ResponseModel<T>>(url, model);
  }
  delete(id: number): Observable<ResponseModel<T>> {
    const url = this.URL_GET_BY_ID + '/' + id;
    return this.http.delete<ResponseModel<T>>(url);
  }
}
