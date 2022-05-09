import { ImageProduct } from "../interfaces/Product.interface";

export class Product{
  productId!: number;
  productName!: string;
  productPrice!: number;
  stock!: number;
  discount!: number;
  description!:string;
  imagesProduct!: ImageProduct[];

  constructor(productId:number, productName:string, productPrice:number, stock:number, discount:number, desciption:string,imagesProduct: ImageProduct[]){
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.stock = stock;
    this.discount = discount;
    this.imagesProduct = imagesProduct;
    this.description = desciption;
  }
}
