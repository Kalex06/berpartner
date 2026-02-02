import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


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
  constructor(private auth: AuthService, private router: Router) { }
  readonly dialog = inject(MatDialog);


  openNotifications() {
    this.dialog.open(NotificationsComponent);
  }

  options: SortOption[] = [
    { value: 'newest-0', viewValue: 'Legújabb' },
    { value: 'price-desc', viewValue: 'Legdrágább felül' },
    { value: 'price-asc', viewValue: 'Legolcsóbb felül' },
  ];
  selectedSort: string = 'newest-0';

  navigateBack() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 400);
  }


  user: any = null

  // ngOnInit() {
  //   this.auth.getProfile().subscribe({
  //     next: profile => {
  //       this.user = profile;
  //     },
  //     error: err => {
  //       this.router.navigate(['/login']);
  //       alert(err.error.message)
  //     }
  //   });
  // }
}
