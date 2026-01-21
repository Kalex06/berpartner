import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private auth:AuthService,private router:Router){}

  readonly dialog = inject(MatDialog);

  openNotifications() {
    this.dialog.open(NotificationsComponent);
  }

    options: SortOption[] = [
    {value: 'newest-0', viewValue: 'Legújabb'},
    {value: 'price-desc', viewValue: 'Legdrágább felül'},
    {value: 'price-asc', viewValue: 'Legolcsóbb felül'},
  ];


 
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
