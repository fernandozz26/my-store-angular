import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuantitySelectService } from './service/service.service';

@Component({
  selector: 'quantity-select',
  templateUrl: './quantity-select.component.html',
  styleUrls: ['./quantity-select.component.scss']
})
export class QuantitySelectComponent implements OnInit {

  constructor(private quantitySelectService: QuantitySelectService) { }

  show:boolean = false;
  @Output() val: EventEmitter<number> = new EventEmitter<number>();

  onlyNumbers = "^[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEFa-zA-Z\s'-]{1,50}$";
  @Input() value:number = 1;

  ngOnInit(): void {
    this.val.subscribe(data => {
      this.value = data;
    });
  }

  onEnter(event:any):boolean {
    if(event.which == 13 || event.keyCode == 13){
      this.show = false;
    }

    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;

  }

  setNormalValue = (val :number) => {this.val.emit(val); this.show = false;}
  setNormalValueCustom = (event:any) => {this.val.emit(event.target.value);}
  showSelect = () => {this.show = !this.show}

}
