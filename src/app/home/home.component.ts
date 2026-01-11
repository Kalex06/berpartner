import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  readonly dialog = inject(MatDialog);

  openNotifications() {
    this.dialog.open(NotificationsComponent);
  }
}
