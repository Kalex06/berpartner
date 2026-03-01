import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  uploaditem(data:any){
   return this.http.post<any>(`${this.API}/item/upload/pictures`,data);
  }

  getAllItems(sort:string,category?:string){
    let params = new HttpParams().set('sort',sort);
    if(category)
    {
      params = new HttpParams().set('category',category);
    }
    return this.http.get<any>(`${this.API}/item/all`,{params});
  }

  getItem(id:number){
    return this.http.get<any>(`${this.API}/item/${id}`);
  }

  getItemByOwner(id:number){
    return this.http.get<any>(`${this.API}/item/owner/${id}`)
  }
  
    
}
