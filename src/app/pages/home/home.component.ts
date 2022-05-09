import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/dto/product.class';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carouselProducts!: Product[];

  loader:boolean = true;

  constructor(private productService: ProductService) {
    this.loader = false;
      this.productService.getSellerProducts().subscribe((data: Product[]) => {
          this.carouselProducts = data;
      });
      this.loader = true;
   }

  ngOnInit(): void {

  }



}
