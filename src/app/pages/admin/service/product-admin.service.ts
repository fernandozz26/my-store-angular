import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageProduct, Product } from 'src/app/shared/interfaces/Product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductAdminService{
  productUrl = "http://localhost:8082/product";

  constructor(private http: HttpClient) {}

  public getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl);
  }

  public saveProduct(product: Product): Observable<any>{
    return this.http.post(this.productUrl, product, {responseType: "text"});
  }

  public saveProductImgs(imgs: ImageProduct[]) : Observable<any>{
    return this.http.patch(this.productUrl+"/img", imgs, {responseType: "text"});
  }

  public updateProduct(product: Product): Observable<any>{
    return this.http.patch(this.productUrl, product, {responseType: "text"});
  }

  public deleteProduct(id:number): Observable<any>{
    return this.http.delete(this.productUrl+"/"+id, {responseType: "text"})
  }

  public searchProducts(word: string):Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl+"/search/"+word);
  }

  productTable:BehaviorSubject<any> = new BehaviorSubject<Product[]>([]);

  get productTable$(): Observable<Product[]>{
    return this.productTable.asObservable();
  }



  @Output() popupImage:EventEmitter<boolean> = new EventEmitter();
  @Output() popupImageText:EventEmitter<String[]> = new EventEmitter();
  @Output() rowsTextArea:EventEmitter<number> = new EventEmitter();
}
