import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  login(user: UserInfo): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'login', user);
  }
}

interface UserInfo {
  user_name: string;
  password: string;
}
