import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = localStorage;
  constructor() { }
  saveItem(name: string, value: any): void {
    this.storage.setItem(name, value);
  }
  getItem(name: string): object | string {
    return this.storage.getItem(name);
  }
  clearData(): void {
    this.storage.clear();
  }
}
