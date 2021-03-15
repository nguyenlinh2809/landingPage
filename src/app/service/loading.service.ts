import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading$ = new BehaviorSubject(false);
  constructor() { }

  getLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
  setLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }
}
