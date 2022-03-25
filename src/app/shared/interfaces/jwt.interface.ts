export interface Jwt{
  token: string;
  bearer: string;
  username: string;
  authorities: any[];
}
