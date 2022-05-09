import { EventEmitter, Injectable, Output } from '@angular/core';
import { SessionConstants } from '../constants/session-contants';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  @Output() username:EventEmitter<any> = new EventEmitter();
  @Output() isLogged:EventEmitter<boolean> = new EventEmitter();
  @Output() roles:EventEmitter<any> = new EventEmitter();
  @Output() isAdmin:EventEmitter<boolean> = new EventEmitter();
  constructor() {

  }


}
