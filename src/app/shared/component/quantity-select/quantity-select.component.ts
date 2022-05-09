import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quantity-select',
  templateUrl: './quantity-select.component.html',
  styleUrls: ['./quantity-select.component.scss']
})
export class QuantitySelectComponent implements OnInit {

  constructor() { }

  show:boolean = false;
  value: number = 0;

  ngOnInit(): void {
  }

  onEnter(event:any):void {
    if(event.which == 13 || event.keyCode == 13){
      this.show = false;
    }
  }
  setNormalValue = (val :number) => {this.value = val; this.show = false;}
  setNormalValueCustom = (event:any) => {this.value = event.target.value;}
  showSelect = () => {this.show = !this.show}

}
