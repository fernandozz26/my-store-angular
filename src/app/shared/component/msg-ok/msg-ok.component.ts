import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-ok',
  templateUrl: './msg-ok.component.html',
  styleUrls: ['./msg-ok.component.scss']
})
export class MsgOkComponent implements OnInit {

  @Input() fail: boolean = false;
  @Input() show: boolean = false;

  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      if(this.show === true){
        let msgOkk = document.getElementById('msgOKK');
        msgOkk?.classList.add('animation')
        setTimeout(()=>{this.show = false;
          msgOkk?.classList.remove('animation')},2000);

      }
    }, 1000)
  }

}
