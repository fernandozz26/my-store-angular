import { Product } from "./product.class";

export class Cart{

  productId!: number;
  quantity!: number;
  username!: string;

  constructor(productId: number, quantity: number, username:string){
    this.productId = productId;
    this.quantity = quantity;
    this.username = username;
  }
}


export class ProductCart{
  productCartId!: number;
  product!:Product;
  cartId!:number;
  quantity!: number;
  productStatus!: string;
}
