import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private domain = 'http://localhost:8080';
  private userApiPath = '/api/user';
  private registerPath = this.userApiPath + '/registration';
  private loginPath = this.userApiPath + '/login';
  private verifyEmailPath = this.userApiPath + '/verify-email';
  private forgotPasswordPath = this.userApiPath + '/forgot-password?email=';
  private changePasswordPath = this.userApiPath + '/change-password?token=';
  private getUserPath = this.userApiPath + '/';
  private getUsersPath = this.userApiPath + '/users'; 
  private getOtherUserPath = this.userApiPath + '/';
  private editUserPath = this.userApiPath + '/';

  constructor(private http: HttpClient) { }

  register(user : Object) : Observable<any> {
    let url = this.domain + this.registerPath;
    let body = JSON.stringify(user);
    let options = this.getAcceptAndContentTypeHeader();
    return this.post(url, body, options);
  }

  login(username : String, password : string) : Observable<any> { 
    let url = this.domain + this.loginPath;
    let body = {username, password};
    let options = this.getAcceptAndContentTypeHeader();
    return this.post(url, body, options);
  }

  verifyEmail(token : String) : Observable<any> {
    let url = this.domain + this.verifyEmailPath;
    let body = { token };
    let options = this.getAcceptAndContentTypeHeader();
    return this.patch(url, body, options);
  }

  forgotPassword(email : String) : Observable<any> {
    let url = this.domain + this.forgotPasswordPath + email;
    return this.get(url, {});
  }

  changePassword(token : String, body : Object) : Observable<any> {
    let url = this.domain + this.changePasswordPath + token;
    let options = this.getAcceptAndContentTypeHeader();
    return this.patch(url, body, options);
  }

  getUser(JWToken : string) : Observable<any> {
    let url = this.domain + this.getUserPath;
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.get(url, options);
  }

  getUsers(JWToken : string) : Observable<any> {
    let url = this.domain + this.getUsersPath;
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.get(url, options);
  }

  getOtherUser(JWToken : string, id : String) : Observable<any> {
    let url = this.domain + this.getOtherUserPath + id;
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.get(url, options);
  }

  editUser(JWToken : string, id : String, user : Object) : Observable<any> {
    let url = this.domain + this.editUserPath + id;    
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.put(url, user, options)
  }

  private getAuthorizationBearerHeader(JWToken : string){
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JWToken
      })
    };
  }

  private getAcceptAndContentTypeHeader(){
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    };
  }

  private post(url : string, body : Object, options : Object) : Observable<any> {
    let data =  this.http.post(url, body, options)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          return of(error.error);
      }));
    return data;
  }

  private patch(url : string, body : Object, options : Object) : Observable<any> {
    let data =  this.http.patch(url, body, options)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          return of(error.error);
      }));
    return data;
  }

  private get(url : string, options : Object) : Observable<any> {
    let data =  this.http.get(url, options)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          return of(error.error);
      }));
    return data;
  }

  private put(url : string, body : Object, options : Object) : Observable<any> {
    let data =  this.http.put(url, body, options)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          return of(error.error);
      }));
    return data;
  }
}
