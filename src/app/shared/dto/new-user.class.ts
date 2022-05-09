export class NewUser{
  firstName: string;
  lastName: string;
  username: string;
  email:string;
  password: string;
  date: Date;


  constructor(firstName: string,
    lastName: string,
    username: string,
    email:string,
    password: string,
    date: Date) {
      this.firstName = firstName;
      this.username = username;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.date = date;
    }
}
