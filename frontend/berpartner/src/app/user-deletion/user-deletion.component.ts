import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-deletion',
  templateUrl: './user-deletion.component.html',
  styleUrl: './user-deletion.component.css'
})
export class UserDeletionComponent {
  private passwordfb = inject(FormBuilder);

  passwordFormGroup = this.passwordfb.group({
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
 
  constructor(private user: UserService,private toastr: ToastrService,private router:Router,@Inject(MAT_DIALOG_DATA) public data: any){}
  

 onDelete(){

  this.user.deleteUser({"password":this.passwordFormGroup.value.password,"email":this.data.currentEmail}).subscribe({
    next:()=> {
      this.toastr.success("Sikeres Törlés!");
      this.router.navigate(['/login']);
    },
    error:(err)=> {
     this.toastr.error(err.error.message);
    }
  })




 }

}