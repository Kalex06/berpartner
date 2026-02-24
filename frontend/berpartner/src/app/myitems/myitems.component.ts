import { Component, inject, OnInit } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ItemService } from '../services/item/item.service';
import { switchMap } from 'rxjs';


interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrl: './myitems.component.css'
})
export class MyitemsComponent implements OnInit {
  constructor(private auth:AuthService,private item:ItemService, private router: Router) { }
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

  posts: any[]=[];







  ngOnInit() {
    this.auth.getProfile().pipe(switchMap(profile=>{
      console.log(profile)
     return this.item.getItemByOwner(profile.id)
    })).subscribe({
      next:data=>{
        this.posts=data
        
      },
      error(err) {
        console.log(err)
      },
    })
   
}
}