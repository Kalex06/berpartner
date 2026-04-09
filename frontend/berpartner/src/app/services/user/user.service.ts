import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:3000';
  
    constructor(private http: HttpClient) {}

    updatePhone(data:any){
   return this.http.patch<any>(`${this.API}/user/update/phone`,data);
  }

  updatePassword(data:any){
   return this.http.patch<any>(`${this.API}/user/update/password`,data);
  }

  updateAddress(data:any){
    return this.http.patch<any>(`${this.API}/user/update/address`,data);
  }


  updateUsername(data:any){
   return this.http.patch<any>(`${this.API}/user/update/username`,data);
  }

  updateEmail(data:any){
   return this.http.patch<any>(`${this.API}/user/update/email`,data);
  }

  updateProfilePicture(data:any){
   return this.http.patch<any>(`${this.API}/user/update/avatar`,data);
  }
 
  deleteUser(data:any){
   return this.http.delete<any>(`${this.API}/user/delete`,data)
  }
  
}
