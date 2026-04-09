import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  constructor(private Message: MessageService, private router: Router,private route:ActivatedRoute) { }

  isMenuOpen = true;

  messages: any[] = []

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{
       const type = params['type'];
       this.load(type);
    });

  }

    typeChange(type:string){
    this.router.navigate([],{
      queryParams: {type: type}
    });
  }

  load(type:string) {
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
        this.route.queryParams.subscribe(params=>{
        const type = params['type'];
        this.load(type);
    });
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
        this.route.queryParams.subscribe(params=>{
        const type = params['type'];
        this.load(type);
       });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 403 || err.status == 401) {
          this.router.navigate(['/login']);

        }
      }
    })

  }

}
