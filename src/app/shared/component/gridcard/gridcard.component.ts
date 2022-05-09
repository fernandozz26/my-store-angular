import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../dto/product.class';


@Component({
  selector: 'app-gridcard',
  templateUrl: './gridcard.component.html',
  styleUrls: ['./gridcard.component.scss']
})
export class GridcardComponent implements OnInit {

  constructor() { }

  @Input() data!: Product[];

  ngOnInit(): void {
  }

}
