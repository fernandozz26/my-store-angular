import { Product } from "./product.class";


export class FavoriteProduct{
  productId!: number;
  username!: string;

  constructor(productId:number, username: string){
    this.productId = productId; this.username = username;
  }
}

export class Favorite{
  favoriteId!: number;
  product!: Product;
  userId!: number;

  constructor(favoriteId: number, product: Product){
    this.favoriteId = favoriteId;
    this.product = product;
    this.userId = 0;
  }
}
