import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SessionConstants } from '../../constants/session-contants';
import { Cart } from '../../dto/cart-product.class';
import { Product } from '../../dto/product.class';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-linear-product',
  templateUrl: './linear-product.component.html',
  styleUrls: ['./linear-product.component.scss']
})

export class LinearProductComponent implements OnInit {

  @Input() product!: Product;
  @Input() quantity: number = 1;
  loader: boolean = true;
  showMsg: boolean = false;
  showMsgFail : boolean = false;
  @Input() showTotal: boolean = false;
  @Input() showAddToCart: boolean = true;
  @Output() deleteProduct:EventEmitter<() => void> = new EventEmitter();
  @Output() updateProduct:EventEmitter<() => void> = new EventEmitter();
  @Output() quantityEmmiter:EventEmitter<number> = new EventEmitter();


  constructor(private productService:ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  showOkMsg = () => {this.showMsg = true; this.showMsgFail = false; setTimeout(()=>{this.showMsg = false},3500)}
  showFailMsg = () => {this.showMsg = true; this.showMsgFail = true; setTimeout(()=>{this.showMsg = false},3500)}

  setQuantity(val:number):void{
    this.quantity = val;
    this.quantityEmmiter.emit(val);
    this.updateProduct.emit(() => {});
  }

  totalFilter(val: number): string{
    return val.toFixed(2);
  }

  addToCart():void{
    this.loader = false;
    let username :string | null = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
    if(username){
      let product: Cart = new Cart(this.product.productId, this.quantity, String(username));
      this.productService.saveCartProduct(product).pipe(
        tap( () => {this.showOkMsg()}, err => {
          if(err instanceof HttpErrorResponse){
            if(err.status !== 401){
                this.showFailMsg();
                return;
            }
            this.router.navigate(['login']);
          }
        })
      ).subscribe();
    }else{
      this.router.navigateByUrl("login");
    }
    this.loader = true;
  }

  buyNow():void{
    let username :string | null = sessionStorage.getItem(SessionConstants.USER_NAME_KEY);
    if(username !== '' || null){
      this.router.navigateByUrl('checkout/'+username+'/'+this.product.productId);
    }else{
      this.router.navigate(['login']);
    }

  }

  deleteProductClick():void{
    this.deleteProduct.emit( () => {});
  }


}
