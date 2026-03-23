import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrl: './edit-data.component.css'
})
export class EditDataComponent {
  private fb = inject(FormBuilder);
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newValue: ['', Validators.required],
      addressGroup: this.fb.group({
        zip: [''],
        city: [''],
        street: [''],
        houseNumber: ['']
      })
    });

    if (this.data.type === 'address') {
      this.editForm.get('newValue')?.clearValidators();
      this.editForm.get('newValue')?.updateValueAndValidity();
    }
  }

  onConfirm() {
    this.dialogRef.close(this.editForm.value);
  }
}
