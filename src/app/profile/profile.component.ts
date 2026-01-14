import { Component, inject } from '@angular/core';
import { UserDeletionComponent } from '../user-deletion/user-deletion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    readonly dialog = inject(MatDialog);

    openUserDeletionDialog() {
      this.dialog.open(UserDeletionComponent);
    }
}
