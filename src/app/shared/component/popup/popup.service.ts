
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PopupService{

  @Output() showPopup:EventEmitter<boolean> = new EventEmitter();
}
