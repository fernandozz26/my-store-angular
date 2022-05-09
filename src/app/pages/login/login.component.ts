import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/shared/dto/jwt.class';
import { LoginUser } from 'src/app/shared/dto/login-user.class';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginOrSignin : boolean = true;

  badFields: boolean = false;
  isLogged!:boolean;
  isLoginFail:boolean= false;
  isAdminUser: boolean = false;
  loginUser!: LoginUser;
  username: string = "";
  password: string = "";
  roles!: string[];
  msg:string  ="";

  loader:boolean = true;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private userDataService:UserDataService
  ) {
    this.userDataService.isLogged.subscribe((data:boolean) =>{
      this.isLogged = data;
    })
  }

  ngOnInit(): void {
    // si ya estoy registrado y no soy usuario redirecciono a home
    if(this.tokenService.getToken()){

      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.isLogged = true;

      this.roles.forEach( (rol:string) => {

        if(JSON.stringify(rol) === '{"authority":"ROLE_ADMIN"}'){
            this.isAdminUser = true;
        }
        });

        !this.isAdminUser && this.router.navigateByUrl("");
    }

  }

  onLogin() : void{
    this.loginUser = new LoginUser(this.username,this.password);
    this.loader = false;
    this.authService.login(this.loginUser).subscribe(
      (data:Jwt) => {

        this.userDataService.isLogged.emit(true);
        this.isLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.userDataService.roles.emit(data.authorities);
        this.roles = data.authorities;
        JSON.stringify(this.roles).includes('{"authority":"ROLE_ADMIN"}') ? this.userDataService.isAdmin.emit(true) : this.userDataService.isAdmin.emit(false);
        this.userDataService.username.emit(data.username);
        this.router.navigateByUrl("");
        this.loader = true;
      }, (err: Error) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.msg = err.message;
        console.log(this.msg)
        this.loader = true;
      }
    );

  }

  onRegister():void{

  }

  loginHandle() : void{
    this.loginOrSignin = !this.loginOrSignin;
  }

}
