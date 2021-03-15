import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get token
    this.loadingService.setLoading(true);
    const token = this.storageService.getItem('access_token');
    // set authentication header
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token.toString()),
      });
    } else {
      this.router.navigate(['/login']);
    }

    // set default header
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    } else if (
      request.headers.get('Content-Type').includes('multipart/form-data')
    ) {
      request = request.clone({
        headers: request.headers.delete('Content-Type'),
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }),
      finalize(() => {
        setTimeout(() => {
          this.loadingService.setLoading(false);
        }, 1000);
      })
    );
  }
}
