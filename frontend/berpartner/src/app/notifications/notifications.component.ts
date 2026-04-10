import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RejectRequestComponent } from '../reject-request/reject-request.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  constructor(private Message: MessageService, private router: Router, private route: ActivatedRoute) { }

  isMenuOpen = true;

  readonly dialog = inject(MatDialog);
  messages: any[] = []

  currentType = "all";


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.currentType = params['type'] || "all";
      this.load(this.currentType);
    });

  }

  openRejectDialog(msg: any) {
    const dialogRef = this.dialog.open(RejectRequestComponent, {
      data: msg,
      width: '450px'
    });


    dialogRef.afterClosed().subscribe(reason=>{
      if(reason){
        msg.tartalom = reason;
        this.reject(msg);
      }
    })

  }

  typeChange(type: string) {
    this.router.navigate([], {
      queryParams: { type: type }
    });
  }

  load(type: string) {
    this.Message.getMessages(type).subscribe({
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
        this.load(this.currentType);
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
        this.load(this.currentType);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 403 || err.status == 401) {
          this.router.navigate(['/login']);

        }
      }
    })

  }





}
