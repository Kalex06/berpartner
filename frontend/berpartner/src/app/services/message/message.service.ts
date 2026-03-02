import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private API = 'http://localhost:3000';

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

}
