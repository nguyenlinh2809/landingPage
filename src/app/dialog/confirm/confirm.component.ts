import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ConfirmComponent>,
              private ngZone: NgZone) {
    this.ngZone.run(() => {
      this.data = {...data};
    });
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.ngZone.run(() => {
      this.dialogRef.close(true);
    });
  }
  onCancel(): void {
    this.ngZone.run(() => {
      this.dialogRef.close(false);
    });
  }

}
