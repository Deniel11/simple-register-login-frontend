import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token:string) {
    localStorage.setItem('token', token);
 }
  
 getToken(): string | null {
    let token = localStorage.getItem('token');
    return token;
 }

 removeToken() {
  localStorage.clear();
 }
}
