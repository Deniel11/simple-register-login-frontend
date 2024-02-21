import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private registerPath = 'registration';
  private loginPath = 'login';
  private verifyEmailPath = 'verify-email';
  private forgotPasswordPath = 'forgot-password?email=';
  private changePasswordPath = 'change-password?token=';
  private getUserPath = '';
  private getUsersPath = 'users'; 
  private getOtherUserPath = '';
  private editUserPath = '';

  constructor(private http: HttpClient) { }

  register(user : Object) : Observable<any> {
    let url = environment.apiURL + this.registerPath;
    let body = JSON.stringify(user);
    let options = this.getAcceptAndContentTypeHeader();
    return this.post(url, body, options);
  }

  login(username : String, password : string) : Observable<any> { 
    let url = environment.apiURL + this.loginPath;
    let body = {username, password};
    let options = this.getAcceptAndContentTypeHeader();
    return this.post(url, body, options);
  }

  verifyEmail(token : String) : Observable<any> {
    let url = environment.apiURL + this.verifyEmailPath;
    let body = { token };
    let options = this.getAcceptAndContentTypeHeader();
    return this.patch(url, body, options);
  }

  forgotPassword(email : String) : Observable<any> {
    let url = environment.apiURL + this.forgotPasswordPath + email;
    return this.get(url, {});
  }

  changePassword(token : String, body : Object) : Observable<any> {
    let url = environment.apiURL + this.changePasswordPath + token;
    let options = this.getAcceptAndContentTypeHeader();
    return this.patch(url, body, options);
  }

  getUser(JWToken : string) : Observable<any> {
    let url = environment.apiURL + this.getUserPath;
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.get(url, options);
  }

  getUsers(JWToken : string) : Observable<any> {
    let url = environment.apiURL + this.getUsersPath;
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.get(url, options);
  }

  getOtherUser(JWToken : string, id : String) : Observable<any> {
    let url = environment.apiURL + this.getOtherUserPath + id;
    let options = this.getAuthorizationBearerHeader(JWToken);
    return this.get(url, options);
  }

  editUser(JWToken : string, id : String, user : Object) : Observable<any> {
    let url = environment.apiURL + this.editUserPath + id;    
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
          return of(error);
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
