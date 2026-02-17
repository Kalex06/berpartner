import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  UploadRent(data:any){
   return this.http.post<any>(`${this.API}/rent/upload`,data);
  }
}
