import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionConstants } from '../../constants/session-contants';
import { TokenService } from '../../services/token.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username!: string;
  isLoged!: boolean;
  roles! : string;
  isAdmin!: boolean;
  showMenu:boolean = true;

  constructor(private tokenService: TokenService, private router: Router, private userDataService:UserDataService) {

    userDataService.username.subscribe((data:string) =>{
      this.username = data;
    });
    userDataService.isLogged.subscribe((data:boolean) =>{
      this.isLoged = data;
    });

    userDataService.roles.subscribe( (data: string) => {
      this.roles = data;
    });

    userDataService.isAdmin.subscribe((rol:boolean) =>{
      this.isAdmin = rol;
    });

   }



  ngOnInit(): void {
    if(sessionStorage.getItem(SessionConstants.USER_NAME_KEY) !==null){
      this.userDataService.roles.emit(sessionStorage.getItem(SessionConstants.AUTHORITIES_KEY));
      this.userDataService.isLogged.emit(true);
      this.userDataService.username.emit(sessionStorage.getItem(SessionConstants.USER_NAME_KEY));
    }

    if(this.roles !== undefined && this.roles.includes('ROLE_ADMIN')){
      this.userDataService.isAdmin.emit(true);
    }

    this.showMenuEvent();
  }

  logout():void{
    this.tokenService.logOut();
    this.userDataService.username.emit("");
    this.userDataService.roles.emit([]);
    this.userDataService.isLogged.emit(false);
    this.isAdmin = false;
    this.router.navigateByUrl("/login");
  }

  hideMenuEvent() : void{
    let resolution = window.innerWidth;
    if(resolution <= 900){
      this.showMenu = false;
    }
  }

  showMenuEvent():void{
    let resolution = window.innerWidth;
    if(resolution >= 900){
      this.showMenu = true;
    }else if(resolution < 900 && this.showMenu === false){
      this.showMenu = true;
    }else if(resolution < 900 && this.showMenu === true){
      this.showMenu = false;
    }

  }

}
