import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../model/category.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CoreService<CategoryModel> {

  URL_GET_LIST = this.baseUrl + 'categories';
  URL_GET_BY_ID = this.baseUrl + 'categories';
  URL_DELETE = this.baseUrl + 'categories';
  URL_CREATE = this.baseUrl + 'categories';
  URL_UPDATE = this.baseUrl + 'categories';
  constructor(public http: HttpClient) {
    super(http);
  }

}
