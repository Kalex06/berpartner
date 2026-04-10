import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RejectRequestComponent } from '../reject-request/reject-request.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  constructor(private Message: MessageService, private router: Router) { }

  isMenuOpen = true;

  readonly dialog = inject(MatDialog);
  messages: any[] = []

  ngOnInit(): void {

    this.load();

  }

openRejectDialog(msg: any) {
  const dialogRef = this.dialog.open(RejectRequestComponent, {
    data: msg,
    width: '450px'
  });


}

  load() {
    this.Message.getMessages().subscribe({
      next: (data) => {
        this.messages = data;

      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 403 || err.status == 401) {
          this.router.navigate(['/login']);

        }
      }
    })
  }

  accept(data: any) {
    this.Message.acceptMessage(data).subscribe({
      next: () => {
        console.log("Kérés elfogadva");
        this.load();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 403 || err.status == 401) {
          this.router.navigate(['/login']);

        }
      }
    })

  }

  reject(data: any) {
    this.Message.rejectMessage(data).subscribe({
      next: () => {
        console.log("Kérés elutasítva");
        this.load();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 403 || err.status == 401) {
          this.router.navigate(['/login']);

        }
      }
    })

  }

}
