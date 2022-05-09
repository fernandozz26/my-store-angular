import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../dto/product.class';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent implements OnInit {

  isFavorite!:boolean;
  constructor(private router: Router, private productService: ProductService) {

  }

  @Input() product!:Product;
  @Input() seller!: boolean;

  ngOnInit(): void {
      this.productService.isFavoriteSaved(this.product) ? this.isFavorite = true : this.isFavorite = false;
  }

  viewProduct = (id: number) => {window.location.href = "product/"+id}


  addToFavorite(): void{
    this.productService.addToFavorite(this.product);
    this.productService.isFavoriteSaved(this.product) ? this.isFavorite = true : this.isFavorite = false;
  }



}
