import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../dto/jwt.class';
import { LoginUser } from '../dto/login-user.class';
import { NewUser } from '../dto/new-user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "https://user-service-jwt.herokuapp.com/auth/"

  constructor(private http : HttpClient) { }

  public newUser(newUser: NewUser) : Observable<any> {

    return this.http.post<any>(this.authUrl + "new", newUser);
  }

  public login(loginUser: LoginUser) : Observable<any> {
    return this.http.post<Jwt>(this.authUrl + "login", loginUser);
  }


}
