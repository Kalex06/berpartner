import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ChangeDetectionStrategy, signal, } from '@angular/core';
import { UserDeletionComponent } from '../user-deletion/user-deletion.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SettingsComponent {
  private fb = inject(FormBuilder);

  darkMode = false;
  passwordForm: FormGroup;
  emailForm: FormGroup;
  phoneForm: FormGroup;

  readonly panelOpenState = signal(false);

  constructor(private auth:AuthService,private _user:UserService,private router:Router,private toastr:ToastrService) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]]
    });

    this.emailForm = this.fb.group({
      newEmail: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]]
    });

    this.phoneForm = this.fb.group({
      newPhone: ['', [
        Validators.required,
        Validators.pattern(/^\+36\s\d{2}\s\d{3}\s\d{4}$/)
      ]]
    });
  }

    readonly dialog = inject(MatDialog);

    openUserDeletionDialog() {
      this.dialog.open(UserDeletionComponent);
    }


    selectedFile: File | null = null;


    onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      const formData = new FormData();

      if(this.selectedFile){
      formData.append('selectedFiles', this.selectedFile, this.selectedFile.name);

     this._user.updateProfilePicture(this.selectedFile).subscribe({
      next:()=>this.toastr.success("Sikeres Profilkép módosítás!"),
      error:(err)=> {
        this.toastr.error("Sikertelen Profilkép módosítás!")
      }
     })
    }
    }
  }

    
  user:any = null




  ngOnInit() {
    this.auth.getMyProfile().subscribe({
      next: profile => {
       this.user = profile;
      },
      error: err => {
       this.router.navigate(['/login']);
       alert(err.error.message)
      }
    });
  }
}
