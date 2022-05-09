import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  @Input() show:boolean = false;
  @Input() rows:number = 1;
  @Input() value: string = '';
  @Input() buttonText: string = 'Guardar';

  @Input() title: string = '';

  @Output() okcallback:EventEmitter< () => any>  = new EventEmitter();
  @Output() hideCallback:EventEmitter< () => any>  = new EventEmitter();
  @Output() valueEdited: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  hidePopup():void{
    this.hideCallback.emit(() => {});
  }

  okPopup():void{
    this.valueEdited.emit(this.value);
    this.okcallback.emit( () => {});
  }


}
