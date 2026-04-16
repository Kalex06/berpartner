import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private API = 'http://localhost:3000';

  constructor(private http:HttpClient) {}

  getAllcondition(){
    return this.http.get<any>(`${this.API}/condition/all`);
  }
}
