import { Injectable } from '@angular/core';
import { SessionConstants } from '../constants/session-contants';





@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles:string[] = [];

  constructor() {

  }

  sendData() : void{

  }

  public logout():void{
    window.sessionStorage.removeItem(SessionConstants.TOKEN_KEY);
    window.sessionStorage.removeItem(SessionConstants.USER_NAME_KEY);
    window.sessionStorage.removeItem(SessionConstants.AUTHORITIES_KEY);
  }

  public setToken(token:string) : void{
    window.sessionStorage.removeItem(SessionConstants.TOKEN_KEY);
    window.sessionStorage.setItem(SessionConstants.TOKEN_KEY, token);
  }

  getToken(): string | null{
    return window.sessionStorage.getItem(SessionConstants.TOKEN_KEY);
  }

  public setUsername(username:string) : void{
    window.sessionStorage.removeItem(SessionConstants.USER_NAME_KEY);
    window.sessionStorage.setItem(SessionConstants.USER_NAME_KEY, username);
  }

  getUserName(): string | null{
    return window.sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
  }

  public setAuthorities(authorities:string[]) : void{
    window.sessionStorage.removeItem(SessionConstants.AUTHORITIES_KEY);
    window.sessionStorage.setItem(SessionConstants.AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[]{
    this.roles = [];
    // si tengo datos guardados
    if(window.sessionStorage.getItem(SessionConstants.AUTHORITIES_KEY)){

      // obtengo el las autorities en string y las convierto en json para extraer una por una
      let roles = String(sessionStorage.getItem(SessionConstants.AUTHORITIES_KEY));


      let json = JSON.parse(roles);
      json.forEach( (authority: string) => {this.roles.push(authority)})


    }
    return this.roles;
  }

  public logOut() : void{
    window.sessionStorage.clear();
  }

}
