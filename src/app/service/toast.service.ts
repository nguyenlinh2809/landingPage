import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastService: ToastrService) { }

  showSuccessMessage(message: string): void {
    this.toastService.success(message, 'Success!');
  }

  showErrorMessage(message: string): void {
    this.toastService.error(message, 'Error!');
  }
}
