import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/registerUser.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  domain = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  register(user : RegisterUser) : Observable<any> {
    let url = this.domain + '/api/user/registration';

    let body = JSON.stringify(user);

    let options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json'
      })
    };
    return this.post(url, body, options);
  }

  login(username : String, password : string) : Observable<any> { 
    let url = this.domain + '/api/user/login';

    let body = {username, password};

    let options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json'
      })
    };

    return this.post(url, body, options);
  }

  private post(url : string, body : Object, options : Object) : Observable<any> {
    let data =  this.http.post(url, body, options)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          return of(error.error);
      }));
    return data;
  }
}
