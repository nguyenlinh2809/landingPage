import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/model/response.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const userInfo = {
      user_name: this.loginForm.controls.userName.value,
      password: this.loginForm.controls.password.value
    };
    this.authService.login(userInfo)
      .subscribe(
        (user: UserModel) => {
          if (user.status === 'success') {
            this.storageService.saveItem('access_token', user.token);
            this.router.navigate(['landing']);
          }
        }
      );
  }

}
