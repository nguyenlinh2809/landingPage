import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LandingPageModel } from '../model/landing-page.model';
import { ResponseModel } from '../model/response.model';
import { CoreService } from './core.service';
import { HttpCoreService } from './http-core.service';

@Injectable({
  providedIn: 'root'
})
export class PageService extends CoreService<LandingPageModel> {

  URL_GET_LIST = this.baseUrl + 'pages';
  URL_GET_BY_ID = this.baseUrl + 'pages';
  URL_DELETE = this.baseUrl + 'pages';
  URL_CREATE = this.baseUrl + 'pages';
  URL_UPDATE = this.baseUrl + 'pages';
  constructor(protected http: HttpClient) {
    super(http);
  }
  createUrl(landingPageId: string): string {
    if (landingPageId !== 'new') {
      return this.URL_CREATE + '/' + landingPageId;
    } else {
      return this.URL_CREATE;
    }
  }
  createPage(url: string, landingPage: LandingPageModel | FormData): Observable<ResponseModel<LandingPageModel>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    });
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseModel<LandingPageModel>>(url, landingPage, { headers: httpHeaders });
  }
  updatePage(url: string, landingPage: LandingPageModel | FormData): Observable<ResponseModel<LandingPageModel>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.put<ResponseModel<LandingPageModel>>(url, landingPage, { headers: httpHeaders });
  }
  download(fileContent: string, fileName: string): void {
    const pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(fileContent));
    pom.setAttribute('download', fileName);

    if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  }
}
