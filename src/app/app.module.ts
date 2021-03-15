import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalLoadingComponent } from './component/global-loading/global-loading.component';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { LandingComponent } from './component/landing/landing.component';
import { HttpInterceptor } from './service/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BaseComponent } from './component/base/base.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingPageDialogComponent } from './dialog/landing-page-dialog/landing-page-dialog.component';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    GlobalLoadingComponent,
    SideMenuComponent,
    FooterComponent,
    LandingComponent,
    BaseComponent,
    LandingPageDialogComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
