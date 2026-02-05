import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  uploaditem(data:any):Observable<any>{
   return this.http.post(`${this.API}/item/upload/pictures`,data);
  }

    
}
