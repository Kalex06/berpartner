import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/item/item.service';

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
  constructor(private auth: AuthService,private item: ItemService, private router: Router) { }

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

  posts: any[]=[];
  user: any = null;

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: profile => {
        this.user = profile;
      },
      error: err => {
        this.router.navigate(['/login']);
        console.log(err.error.message)
      }
    });
    this.item.getAllItem().subscribe({
      next:(data)=>{
        this.posts = data;
      },
      error(err) {
        console.log(err.error.message);
      },
    })
  }

}
