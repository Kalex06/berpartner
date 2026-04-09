import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  constructor(private Message: MessageService, private router: Router) { }

  isMenuOpen = true;

  messages: any[] = []

  ngOnInit(): void {

    this.load();

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
