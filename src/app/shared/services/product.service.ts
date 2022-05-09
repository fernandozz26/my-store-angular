
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageConstants } from '../constants/localstorage.constants';
import { SessionConstants } from '../constants/session-contants';
import { FavoriteProduct } from '../dto/FavoriteProduct.class';
import { Product } from '../dto/product.class';

@Injectable({
  providedIn: 'root'
})

export class ProductService{

  constructor(private http: HttpClient, private router: Router) {}

  productUrl = "http://localhost:8082/product/";

  public getSellerProducts() : Observable<any>{
    return this.http.get(this.productUrl);
  }

  public getProductById(productId:number) : Observable<any>{
    return this.http.get(this.productUrl+productId);
  }

  public getFavoriteProducts(username: string) :Observable<any>{
    return this.http.get(this.productUrl+"favorite/"+username);
  }

  public saveFavoriteProduct(product: FavoriteProduct) : Observable<any>{
    return this.http.post(this.productUrl+'favorite', product);
  }












  // local

  addToFavorite(product: Product): void{

      let username = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
      if(username){
        let favoriteProduct:FavoriteProduct = {username:username, productId: product.productId}
        this.saveFavoriteProduct(favoriteProduct).subscribe()
      }

    let favorites:Product[] = [];

    // If is saved then unsaved
    if(this.isFavoriteSaved(product)){
      let savedData = String(localStorage.getItem(LocalStorageConstants.LOCAL_FAVORITE));
      favorites = JSON.parse(savedData);

      let newFavorites:Product[] = [];
      favorites.forEach ((productt, i) => {
        if(product.productId !== productt.productId){
          newFavorites.push(productt)
        }
      });
      favorites = newFavorites;
      localStorage.setItem(LocalStorageConstants.LOCAL_FAVORITE, JSON.stringify(favorites));
    }
    // if didn't save
    else if(localStorage.getItem(LocalStorageConstants.LOCAL_FAVORITE)){
      let savedData = String(localStorage.getItem(LocalStorageConstants.LOCAL_FAVORITE));
      favorites = JSON.parse(savedData);
      favorites.push(product);
      localStorage.setItem(LocalStorageConstants.LOCAL_FAVORITE, JSON.stringify(favorites));
    }else{
      favorites.push(product);
      localStorage.setItem(LocalStorageConstants.LOCAL_FAVORITE, JSON.stringify(favorites));
    }
  }

  isFavoriteSaved(product: Product):boolean{
    if(localStorage.getItem(LocalStorageConstants.LOCAL_FAVORITE)){
      let favorites:Product[] = [];
      let savedData = String(localStorage.getItem(LocalStorageConstants.LOCAL_FAVORITE));
      favorites= JSON.parse(savedData)
      let isInside: boolean = false;

      favorites.forEach((favorite: Product) =>{
        if(favorite.productId === product.productId)
          isInside = true;
      });
      return isInside
    }else{
      return false;
    }
  }



}
