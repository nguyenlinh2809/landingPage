import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LandingPageModel } from '../model/landing-page.model';
import { ResponseModel } from '../model/response.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService extends CoreService<LandingPageModel> {

  BASE_URL = '';
  constructor(protected http: HttpClient) {
    super(http);
  }
  createUrl(categoryId: string, landingPageId?: string): string {
    if (landingPageId && landingPageId !== 'new') {
      this.BASE_URL = this.baseUrl + `categories/${categoryId}/landing_pages/${landingPageId}`;
    } else {
      this.BASE_URL = this.baseUrl + `categories/${categoryId}/landing_pages`;
    }
    return this.BASE_URL;
  }
  getListLandingPage(url: string): Observable<ResponseModel<LandingPageModel>> {
    return this.http.get<ResponseModel<LandingPageModel>>(url);
  }
  getBy2Id(url: string): Observable<ResponseModel<LandingPageModel>> {
    return this.http.get<ResponseModel<LandingPageModel>>(url);
  }
  createLandingPage(url: string, landingPage: LandingPageModel | FormData): Observable<ResponseModel<LandingPageModel>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    });
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseModel<LandingPageModel>>(url, landingPage, { headers: httpHeaders });
  }
  updateLandingPage(url: string, landingPage: LandingPageModel | FormData): Observable<ResponseModel<LandingPageModel>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.put<ResponseModel<LandingPageModel>>(url, landingPage, { headers: httpHeaders });
  }
}
