export class Jwt{
  token: string;
  bearer: string;
  username: string;
  authorities: any[];

  constructor(token: string, username: string, authorities: any[]){
      this.token = token;
      this.bearer = "Bearer";
      this.username = username;
      this.authorities = authorities;
  }
}
