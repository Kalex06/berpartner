import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{

  constructor(private Message:MessageService){}


messages:any[] = []

  ngOnInit(): void {

    this.load();
    
  }

 load(){
  this.Message.getMessages().subscribe({
      next:(data)=>{
        this.messages = data;
        
      },
      error(err) {
        console.log(err);
      },
    })
 }

  accept(data: any){
    this.Message.acceptMessage(data).subscribe({
      next:()=>{
        console.log("Kérés elfogadva");
        this.load();
      },
      error(err) {
        alert(err)
      },
    })

  }

  reject(data:any){
    this.Message.rejectMessage(data).subscribe({
      next:()=>{
        console.log("Kérés elutasítva");
        this.load();
      },
      error(err) {
        alert(err)
      },
    })

  }

}
