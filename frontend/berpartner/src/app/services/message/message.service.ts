import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private API = 'http://localhost:3000';

  private notReadedCountSource = new BehaviorSubject<number>(0);

  notReadedCount$ = this.notReadedCountSource.asObservable();

  constructor(private http:HttpClient) {}

getMessages(){
    return this.http.get<any>(`${this.API}/message/all`);
  }

acceptMessage(message:any){
    return this.http.patch<any>(`${this.API}/message/accept`,message);
}

rejectMessage(message:any){
    return this.http.patch<any>(`${this.API}/message/reject`,message);
}

notReadMessageCount(){
  return this.http.get<any>(`${this.API}/message/notReaded`);
}

updatenotReadMessageCount(){
  //return this.http.get<any>
}

}
