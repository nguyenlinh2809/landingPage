import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class AuthModule { }
