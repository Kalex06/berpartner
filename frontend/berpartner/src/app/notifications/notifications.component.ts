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

    this.Message.getMessages().subscribe({
      next:(data)=>{
        this.messages = data;
        
      },
      error(err) {
        console.log(err);
      },
    })
    
  }




  accept(message_id:number,rent_id:number){
    this.Message.acceptMessage(message_id,rent_id).subscribe({
      next:()=>{
        console.log("Kérés elfogadva");
      },
      error(err) {
        alert(err)
      },
    })

  }

  reject(message_id:number,rent_id:number){
    this.Message.rejectMessage(message_id,rent_id).subscribe({
      next:()=>{
        console.log("Kérés elfogadva");
      },
      error(err) {
        alert(err)
      },
    })

  }

}
