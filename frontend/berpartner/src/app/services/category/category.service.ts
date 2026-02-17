import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API = 'http://localhost:3000';

  constructor(private http:HttpClient) {}


  getAllCategory(){
   return this.http.get<any>(`${this.API}/category/all`);
}

}
