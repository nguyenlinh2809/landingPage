import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { LandingPageDialogComponent } from '../dialog/landing-page-dialog/landing-page-dialog.component';
import { CategoryModel } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openLandingPageDialog(
    categories: CategoryModel[],
    selectedCategoryId: number,
    message: string,
    isDisableCatDrop: boolean = false,
    isShowCategory = true
  ): Observable<any> {
    const dialogRef = this.dialog.open(LandingPageDialogComponent, {
      width: '550px',
      height: '550px',
      data: {
        categories,
        selectedCategoryId,
        message,
        isDisableCatDrop,
        isShowCategory
      },
    });

    return dialogRef.afterClosed();
  }
  openConfirmDialog({
    okBtn = 'OK',
    cancelBtn = 'Cancel',
    message,
  }): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '550px',
      height: '450px',
      data: {
        buttons: {
          ok: okBtn,
          cancel: cancelBtn,
        },
        message,
      },
    });

    return dialogRef.afterClosed();
  }
}
