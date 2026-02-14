import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  uploaditem(data:any){
   return this.http.post<any>(`${this.API}/item/upload/pictures`,data);
  }

  getAllItem(){
    return this.http.get<any>(`${this.API}/item/getAll`);
  }

  getItem(id:number){
    return this.http.get<any>(`${this.API}/item/${id}`);
  }

  
    
}
