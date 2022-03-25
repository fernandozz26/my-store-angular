import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginOrSignin : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  loginHandle() : void{
    this.loginOrSignin = !this.loginOrSignin;
  }

}
