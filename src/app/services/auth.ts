import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import {  tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient=inject(HttpClient)
  
   login(email:string,password:string,companySlug:string){
   
   return this.httpClient.post<{token:string}>(`${environment.apiUrl}/auth/user/login`,{
 "email":email, "password":password, "companySlug":companySlug
   }).pipe(tap(res => localStorage.setItem('token', res.token)));

  }
  getToken() {
  return localStorage.getItem('token');
}
logout(){
    return localStorage.removeItem('token');

}
isLoggedIn(){
 return this.getToken()!=null;
  
}
}
