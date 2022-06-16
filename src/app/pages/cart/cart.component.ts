import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SessionConstants } from 'src/app/shared/constants/session-contants';
import { ProductCart } from 'src/app/shared/dto/cart-product.class';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: ProductCart[] = [];
  loader: boolean = true;
  quantity!: number;

  constructor(private productService: ProductService, private router: Router) {
    this.updateProducts();
  }

  updateProducts():void{
    this.loader = false;
    let username = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
    if(username !== '' || !undefined){
      this.productService.getCartProducts(String(username)).pipe(
        tap(() => {}, err => {
          if(err instanceof HttpErrorResponse){
            if(err.status !== 401){
                this.loader = true;;
                return;
            }
            this.router.navigate(['login']);
          }
        })
      ).subscribe(data =>{
        this.cartProducts = data;
        this.loader = true;
      });
    }

  }

  updateProductCart(productCartId: number,  quantity: number):void{
    this.loader = false;
    this.productService.updateProductCart(quantity, productCartId).pipe(
      tap(() => {}, err => {
        if(err instanceof HttpErrorResponse){
          if(err.status !== 401){
              this.loader = true;;
              return;
          }
          this.router.navigate(['login']);
        }
      })
    ).subscribe(() => {
      this.updateProducts();
      this.loader = true;
    });
  }

  deleteProduct(productCartId: number):void{
    this.loader = false;
    this.productService.deleteProductCart(productCartId).subscribe( () => {
      this.updateProducts();
      this.loader = true;
    });
  }

  setQuantity(val: number){
    this.quantity = val;
  }

  getTotal() : string{

    let total: number = 0.0;
    if(this.cartProducts.length > 0){
      this.cartProducts.forEach( (productCart: ProductCart) => {
        total += (productCart.quantity * (productCart.product.productPrice - (productCart.product.productPrice * productCart.product.discount)/100))
      })
    }
    return total.toFixed(2);
  }

  payCart(productCart: ProductCart):void{
    //this.productService.payCart(productCart.cartId).subscribe();
      let username = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
      if(username !== "" || username !== undefined){
        this.router.navigateByUrl("checkout/"+username)
      }

  }

  payProductCart(productId: number):void{
    let username = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
    if(username !== "" || username !== undefined){
      this.router.navigateByUrl("checkout/"+username+"/"+productId)
    }

  }

  ngOnInit(): void {
  }

}
