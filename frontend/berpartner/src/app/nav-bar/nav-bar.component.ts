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
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private auth: AuthService, private router: Router) { }

  readonly dialog = inject(MatDialog);

  openNotifications() {
    this.dialog.open(NotificationsComponent);
  }

  options: SortOption[] = [
    { value: 'newest-0', viewValue: 'Legújabb' },
    { value: 'price-desc', viewValue: 'Legdrágább elöl' },
    { value: 'price-asc', viewValue: 'Legolcsóbb elöl' },
  ];
  selectedSort: string = 'newest-0';

  user: any = null

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
