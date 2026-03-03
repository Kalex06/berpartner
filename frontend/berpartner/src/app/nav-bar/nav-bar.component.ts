import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from '../services/message/message.service';
import { catchError, forkJoin, of } from 'rxjs';

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
  constructor(private auth: AuthService, private router: Router, private message:MessageService){}

  // readonly dialog = inject(MatDialog);

  // openNotifications() {
  //   this.dialog.open(NotificationsComponent);
  // }

  options: SortOption[] = [
    { value: 'newest-0', viewValue: 'Legújabb' },
    { value: 'price-desc', viewValue: 'Legdrágább elöl' },
    { value: 'price-asc', viewValue: 'Legolcsóbb elöl' },
  ];
  selectedSort: string = 'newest-0';

  user: any = null;
  notReadedCount:any =null;

  logOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {


    forkJoin({
      profile: this.auth.getProfile(),
      notRcount: this.message.notReadedMessageCount().pipe(
        catchError(err => {
          console.log("üzenetek lekérdezése sikertelen",err);
          return of(0);
        })
      )
    }).subscribe({
      next: ({profile,notRcount})=> {
        this.user = profile;
        this.notReadedCount = notRcount.unread_count;
      },
      error:(err) =>{
        this.router.navigate(['/login']);
        alert(err.error.message)
      },
    })

    
  }

  


}
