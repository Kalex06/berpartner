import { Component, inject } from '@angular/core';
import { UserDeletionComponent } from '../user-deletion/user-deletion.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    constructor(private auth:AuthService,private router:Router){}
    readonly dialog = inject(MatDialog);

    openUserDeletionDialog() {
      this.dialog.open(UserDeletionComponent);
    }



        user:any = null

  ngOnInit() {
    this.auth.getProfile().subscribe({
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
