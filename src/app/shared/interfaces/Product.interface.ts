export interface Product{
  productId: number,
  productName: string,
  productPrice:number,
  stock: number,
  discount: number,
  description:string,
  imagesProduct: ImageProduct[];
}

export interface ImageProduct{
  imageProductId: number,
  productId: number,
  productImgUrl: string
}
