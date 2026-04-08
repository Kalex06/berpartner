import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrl: './edit-data.component.css'
})
export class EditDataComponent {
  private fb = inject(FormBuilder);
  editForm: FormGroup;

  constructor(private user: UserService,
    private toastr: ToastrService,
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

    if(this.data.type == "email" ){

      this.user.updateEmail({"password":this.editForm.value.currentPassword,"newEmail":this.editForm.value.newValue,"email":this.data.currentEmail}).subscribe({
        next:()=>{
          this.toastr.success("Sikeres Módosítás");
          this.dialogRef.close(this.editForm.value);
        },
        error:(err)=> {
          this.toastr.error(err.error.message);
        }

      }
    );
    }

    if(this.data.type == "phone" ){
      
      this.user.updatePhone({"password":this.editForm.value.currentPassword,"newPhone":this.editForm.value.newValue,"email":this.data.currentEmail}).subscribe({
        next:()=>{
          this.toastr.success("Sikeres Módosítás");
          this.dialogRef.close(this.editForm.value);
        },
        error:(err)=> {
          this.toastr.error(err.error.message);
        }

      }
    );
  }

  if(this.data.type == "password" ){
      
      this.user.updatePassword({"password":this.editForm.value.currentPassword,"newPassword":this.editForm.value.newValue,"email":this.data.currentEmail}).subscribe({
        next:()=>{
          this.toastr.success("Sikeres Módosítás");
          this.dialogRef.close(this.editForm.value);
        },
        error:(err)=> {
          this.toastr.error(err.error.message);
        }

      }
    );
  }
}



}
