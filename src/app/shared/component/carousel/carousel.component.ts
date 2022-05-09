import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../dto/product.class';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  @Input() data : Product[] = [];
  @Input() seller!: boolean;

  ngOnInit(): void {
  }

}
