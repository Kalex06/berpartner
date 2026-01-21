import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';


interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrl: './myitems.component.css'
})
export class MyitemsComponent {
  readonly dialog = inject(MatDialog);

  openNotifications() {
    this.dialog.open(NotificationsComponent);
  }

    options: SortOption[] = [
    {value: 'newest-0', viewValue: 'Legújabb'},
    {value: 'price-desc', viewValue: 'Legdrágább felül'},
    {value: 'price-asc', viewValue: 'Legolcsóbb felül'},
  ];
}
