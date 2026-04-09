import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private API = 'http://localhost:3000';

  private notReadCountSource = new BehaviorSubject<number>(0);

  notReadCount$ = this.notReadCountSource.asObservable();

  constructor(private http:HttpClient) {}

getMessages(type:string){
    let params = new HttpParams().set('type',type);
    return this.http.get<any>(`${this.API}/message/all`,{params});
  }

acceptMessage(message:any){
    return this.http.patch<any>(`${this.API}/message/accept`,message);
}

rejectMessage(message:any){
    return this.http.patch<any>(`${this.API}/message/reject`,message);
}

notReadMessageCount(){
  return this.http.get<any>(`${this.API}/message/notRead`);
}

updatenotReadMessageCount(){
  return this.http.patch<any>(`${this.API}/message/updateNotRead`,null);
}

reloadnotReadMessageCount(){
  this.notReadMessageCount().subscribe({
    next:(count)=> {
      this.notReadCountSource.next(count.unread_count)
    },
  })
}

}
