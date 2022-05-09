import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageProduct, Product } from 'src/app/shared/interfaces/Product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  condown:number= 360000;
  timeLabel: string = '';
  intervalId!: any;
  productId!: number;

  html:string = '';


  carouselProducts!: Product[];
  product!: Product;
  images: ImageProduct[] = [];
  isFavorite!: boolean;
  success:boolean = false;


  constructor(private productService: ProductService, private route: ActivatedRoute) {

    this.productId = parseInt(String(this.route.snapshot.paramMap.get('productId')));

    this.productService.getProductById(this.productId).subscribe((product:Product) => {
      this.product = product;
      product.imagesProduct.forEach( image => {
        this.images.push(image);

      })
      this.success = true;
    });

    this.productService.getSellerProducts().subscribe((data: Product[]) => {
      this.carouselProducts = data;
      });

   }

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.startOfferFlash(),1000)
    let success = setInterval( ()=> {
      if(this.product){
        this.productService.isFavoriteSaved(this.product) ? this.isFavorite = true : this.isFavorite = false;
        clearInterval(success);
      }
    }, 1000);

  }

  startOfferFlash() : void{
    let days = Math.floor(this.condown / 86400);
    let hours =  Math.floor((this.condown-(days * 86400)) / 3600);
    let minutes = Math.floor((this.condown - (days*86400) - (hours* 3600)) / 60);
    let seconds = (this.condown - (days*86400) - (hours* 3600) - (minutes * 60));

    this.timeLabel = days+' : '+ hours + ' : '+minutes+' : '+ seconds;
    this.condown-=1;
  }

  addToFavorite(){
    this.productService.addToFavorite(this.product);
    this.productService.isFavoriteSaved(this.product) ? this.isFavorite = true : this.isFavorite = false;
  }




}
