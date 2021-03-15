import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-page-dialog',
  templateUrl: './landing-page-dialog.component.html',
  styleUrls: ['./landing-page-dialog.component.scss']
})
export class LandingPageDialogComponent implements OnInit {

  data;
  selectedCategoryId: number;
  isCategoryError: boolean;
  selectedFile: File;

  isTemplateNameError: boolean;
  templateName = '';
  constructor(@Inject(MAT_DIALOG_DATA) public dataInput: any,
              public dialogRef: MatDialogRef<LandingPageDialogComponent>,
              private ngZone: NgZone) {
    this.ngZone.run(() => {
      this.data = {...this.dataInput};
      this.selectedCategoryId = this.data.selectedCategoryId;
    });
  }

  ngOnInit(): void {
    console.log('bbb', this.data);
  }

  onClose(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  onSave(): void {
    this.ngZone.run(() => {
      if (!this.validateForm()) {
        return;
      }
      this.dialogRef.close({
        categoryId: this.selectedCategoryId,
        selectedFile: this.selectedFile,
        templateName: this.templateName
      });
    });
  }
  handleFileInput(files: File[]): void {
    this.selectedFile = files[0];
  }
  validateForm(): boolean {
    if (!this.selectedCategoryId && this.data.isShowCategory) {
      this.isCategoryError = true;
    }
    else if (!this.templateName) {
      this.isTemplateNameError = true;
      return false;
    } else {
      return true;
    }
  }

}
