import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(data: any) :Observable<any>{
    return this.http.post(`${this.API}/auth/regist`, data);
  }

  login(data: { email: string; jelszo: string }) {
    return this.http.post<any>(`${this.API}/auth/login`, data);
  }

  getProfile(){
    return this.http.get<any>(`${this.API}/user/myprofile`);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
