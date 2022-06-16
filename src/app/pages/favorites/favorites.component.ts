import { Component, Input, OnInit } from '@angular/core';
import { SessionConstants } from 'src/app/shared/constants/session-contants';
import { Favorite, FavoriteProduct } from 'src/app/shared/dto/FavoriteProduct.class';
import { Product } from 'src/app/shared/dto/product.class';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoritesProducts: Favorite[] = [];
  localFavoriteProducts: Product[] = [];
  loader:boolean = true;

  constructor(private productService: ProductService) {
    let username = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);

    if (username){
      this.productService.getFavoriteProducts(username).subscribe( (data: Favorite[]) => {
        this.favoritesProducts = data
      });
    }
   }

  ngOnInit(): void {
    let intervalId = setInterval ( () => {
      if(this.favoritesProducts !== []){
        this.localFavoriteProducts = this.productService.getLocalFavorites(this.favoritesProducts);
        clearInterval(intervalId);
      }

    }, 1000)
  }

  deleteFavorite(favoriteId: number):void{
    this.loader = false;
    let newFavorites: Favorite[] = [];

    this.productService.deleteFavoriteProduct(favoriteId).subscribe(res => {
      console.log(res);
      this.favoritesProducts.forEach( (favorite:Favorite) => {
        if(favorite.favoriteId !== favoriteId){
          newFavorites.push(favorite);
        }
      })
      this.favoritesProducts = newFavorites;
    });


  }


}
