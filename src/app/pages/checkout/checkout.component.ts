import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionConstants } from 'src/app/shared/constants/session-contants';
import { ProductCart } from 'src/app/shared/dto/cart-product.class';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartProducts: ProductCart[] = [];
  validCart: boolean = false;
  validAddress: boolean = false;

  //pay methods
  payMethod: number = 0;
  validPayMethod: boolean = false;

  // card
    cardName!: string;
    cardNumber!: number;
    cardExpirationMonth!: number;
    cardExpirationYear!: number;
    cardCVV!: number;


  // address
    addressName!: string;
    addressStreet!: string;
    addressOutDoorNumber!: string;
    addressInteriorNumber!: String;
    postalCode!: number;
    city!: string;
    countryState!: string;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) {
    let productId  =  parseInt(String(this.route.snapshot.paramMap.get('productId')));
    let cartId  =  parseInt(String(this.route.snapshot.paramMap.get('productId')));
    let username = String(this.route.snapshot.paramMap.get('username'));
    if(productId && username && cartId){
      this.productService.getCartProduct(cartId, productId).subscribe(data => {
        this.cartProducts.push(data);
      });
    }else if(username){
      this.productService.getCartProducts(username).subscribe(data => {
        this.cartProducts = data;
      });

    }
   }


   setPayMethod(type: number):void{
     this.payMethod = type;

     switch(type){
        case 1:
          
          var paypalCheck  = document.getElementById("paypalCheck") as HTMLInputElement | null;
          var  mercadoCheck = document.getElementById("mercadoCheck") as HTMLInputElement  |  null;
          if(paypalCheck && mercadoCheck){
            paypalCheck.checked = false;
            mercadoCheck.checked = false;
          }
            break;
        case 2:
          var  mercadoCheck = document.getElementById("mercadoCheck") as HTMLInputElement  |  null;
          var cardCreditCheck = document.getElementById("cardCreditCheck") as HTMLInputElement | null;
          if(mercadoCheck && cardCreditCheck){
            mercadoCheck.checked = false;
            cardCreditCheck.checked = false;
          }
          break;
          case 3:
            
            var paypalCheck  = document.getElementById("paypalCheck") as HTMLInputElement | null;
            var cardCreditCheck = document.getElementById("cardCreditCheck") as HTMLInputElement | null;
            if(paypalCheck && cardCreditCheck){
              paypalCheck.checked = false;
              cardCreditCheck.checked = false;
            }
            break;
     }
   }

   cardValidation(): void{
    let currentTime = new Date();
    // returns the month (from 0 to 11)
    let currentMonth:number = currentTime.getMonth() +1;
    let currentYear:number = currentTime.getFullYear();
   if(this.cardName.length >= 10
     && (String(this.cardNumber).length >= 14 && String(this.cardNumber).length <= 19)
     && (this.cardExpirationMonth >0 && this.cardExpirationMonth <= 12)
     && (this.cardExpirationYear >= currentYear && this.cardExpirationYear <= currentYear+10)
     && (String(this.cardCVV).length === 3 || String(this.cardCVV).length === 4) ){

     if(this.cardExpirationYear === currentYear &&  this.cardExpirationMonth > currentMonth){
       this.validCart = true;
       this.validPayMethod = true;
     }else if(this.cardExpirationYear >= currentYear){
       this.validCart = true;
       this.validPayMethod = true;
     }
   }else{
     this.validCart = false;
     this.validPayMethod = false;
   }
   }

   cardKeyDown(event:any):boolean {

    // number
   var charCode = (event.which) ? event.which : event.keyCode;
   if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57) || (event.which == 13 || event.keyCode == 13)) {

    if(event.which == 13 || event.keyCode == 13){
      this.cardValidation();
    }else{
      event.preventDefault();
    }
     return false;
   }
   return true;

    //enter
   if(event.which == 13 || event.keyCode == 13){

   }


 }

   onEnter(event:any):boolean {
     //enter
    if(event.which == 13 || event.keyCode == 13){

    }
    // number
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;

  }

   getTotal(): number{
    let total = 0;
    this.cartProducts.forEach((productCart: ProductCart) => {
      total += productCart.quantity * (productCart.product.productPrice - (productCart.product.productPrice * (productCart.product.discount /100)));
    });
    return total;
   }
  ngOnInit(): void {
  }

}
