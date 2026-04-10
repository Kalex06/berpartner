import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrl: './reject-request.component.css'
})
export class RejectRequestComponent {
  selectedReason: string = 'Sajnálatosan jelen pillanatban nem tudok több bérlést fogadni.';
  customReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<RejectRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getReason(): string {
    if (this.selectedReason === 'custom') {
      return this.customReason
    }
    return this.selectedReason;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}