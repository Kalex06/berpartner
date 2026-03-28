import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  uploadRent(data:any){
   return this.http.post<any>(`${this.API}/rent/upload`,data);
  }

  myRents(){
    return this.http.get<any>(`${this.API}/rent/myrents`);
  }

  ItemRentsDate(id:number){
    return this.http.get<any>(`${this.API}/rent/dates/${id}`);
  }

}
