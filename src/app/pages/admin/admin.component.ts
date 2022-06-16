import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Product } from 'src/app/shared/dto/product.class';
import { ImageProduct } from 'src/app/shared/interfaces/Product.interface';
import { ProductAdminService } from './service/product-admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{


  productTable!:Product[];
  searchProducts: Product[] = [];

  // SearchBar
  searchInput!:string;

  //popup image
  popupProductShow!: boolean;
  popupProductValue: string = '';
  textAreaRows!: number;

    // resources
    currentProductId!:number;
    listImg!: ImageProduct[];

  // popup description
  popupDescriptionProductShow!: boolean;
  popupDescriptionProductValue!: string;

    // resources
    productDescription: string = '';

  // new Product
  newProductName!: string;
  newProductPrice!: number;
  newProductDiscount!: number;
  newProductStock!: number;

  // loader
  loader: boolean = true;
  searchbarItems: boolean = false;
  searchbarLoader: boolean = false;
  msgOkShow:boolean = false;
  msgOk: boolean = false;

  constructor(private productAdminService: ProductAdminService, private router: Router) {
    this.loader = false;
    productAdminService.popupImage.subscribe((data:boolean) => {
      this.popupProductShow = data;
    })

    productAdminService.popupImageText.subscribe( (image:string) => {
      this.popupProductValue += image;
    })

    productAdminService.rowsTextArea.subscribe( (rows: number) => {
      this.textAreaRows = rows;
    })
    this.productAdminService.getAllProducts().pipe(
      tap(() => {}, err => {
        if(err instanceof HttpErrorResponse){
          if(err.status !== 401){
              this.loader = true;;
              return;
          }
          this.router.navigate(['login']);
        }
      })
    ).subscribe((products : Product[]) => {

      this.productTable = products;
      this.productAdminService.productTable.next(this.productTable);
      this.loader = true;
  });

  }

  productTable$ = this.productAdminService.productTable$;

  ngOnInit(): void {
    this.hidePopupImage();
  }

  showOkMsg = () => {this.msgOkShow = true; this.msgOk = false; setTimeout(()=>{this.msgOkShow = false},3500)}
  showFailMsg = () => {this.msgOkShow = true; this.msgOk = true; setTimeout(()=>{this.msgOkShow = false},3500)}
  showSearchBarItems = (val: boolean)=> {this.searchbarItems = val; this.searchProducts = []}

  setSearchProducts = (product: Product) => {this.productAdminService.productTable.next([product])}

  showPopupImage(msgText: ImageProduct[], id: number): void{

    this.currentProductId = id;
    this.productAdminService.popupImage.emit(true);
    this.productAdminService.rowsTextArea.emit(msgText.length)
    let images = [];
    for(var i= 0;i<msgText.length; i++){
      images.push('{"imageProductId":'+msgText[i].imageProductId
      +',"productId":'+msgText[i].productId+',"productImgUrl":"'
      +msgText[i].productImgUrl+'"}');
    }
    this.productAdminService.popupImageText.emit(images);
  }

  hidePopupImage():void{

    this.productAdminService.popupImage.emit(false);
    this.productAdminService.rowsTextArea.emit(0)
    this.productAdminService.popupImageText.emit([]);
    this.popupProductValue = '';
  }

  setValueFromPopupImage = (value:string) =>{this.popupProductValue = value;}

  showPopupDescription=(description: string) =>{this.popupDescriptionProductShow = true;this.popupDescriptionProductValue = description;}

  hidePopupDescription = () =>{this.popupDescriptionProductShow = false;}

  setValueFromPopupDescription = (value: string) => {this.popupDescriptionProductValue = value;}


  // CRUD Product Table

  searchProduct():void{
    this.searchbarLoader = true;
    if(this.searchInput !== ''){
      this.productAdminService.searchProducts(this.searchInput).pipe(
        tap(() => {}, err => {
          if(err instanceof HttpErrorResponse){
            if(err.status !== 401){
                this.loader = true;;
                return;
            }
            this.router.navigate(['login']);
          }
        })
      ).subscribe((res:Product[]) => {
        this.searchProducts = res;
      });
    }else{
      this.productAdminService.getAllProducts().subscribe((res:Product[]) => {
        this.productAdminService.productTable.next(res);
      })
    }
    this.searchbarLoader = false;
  }

  updateProductTable():void{
    this.productAdminService.productTable.next(this.productTable);
  }

  deleteProduct(id: number) :void{
    let array:Product[] = [];
    this.loader = false;
    this.productAdminService.deleteProduct(id).pipe(
      tap( () => {}, err => {
        if(err instanceof HttpErrorResponse){
          if(err.status !== 401){
              this.showFailMsg();
              return;
          }
          this.router.navigate(['login']);
        }
      })
    ).subscribe(res => {

      this.productTable.forEach((product: Product, index: number) => {
        if(product.productId !== id){
          array.push(product);
        }
        this.showOkMsg();
      });
      this.productTable = array;
      this.updateProductTable();
      this.loader = true;
    });

  }

  saveProduct():void{
    let product = new Product(0, this.newProductName, this.newProductPrice, this.newProductStock, this.newProductDiscount,'',[]);

    this.loader = false;
    this.productAdminService.saveProduct(product).subscribe(res => {

      this.productAdminService.getAllProducts().pipe(
        tap( () =>{}, err => {
          if(err instanceof HttpErrorResponse){
            if(err.status !== 401){
                this.showFailMsg();
                return;
            }
            this.router.navigate(['login']);
          }
        })
      ).subscribe((products : Product[]) => {
        this.productTable = products;
        this.productAdminService.productTable.next(this.productTable);
        this.showOkMsg();
      });

      this.newProductName = ''; this.newProductDiscount = 0; this.newProductPrice = 0; this.newProductStock = 0;
      this.loader = true;
    });
  }

  editProduct(product : Product): void{
    this.loader = false;
    this.productAdminService.updateProduct(product).pipe(
      tap(() => {}, err => {
        if(err instanceof HttpErrorResponse){
          if(err.status !== 401){
              this.showFailMsg();
              return;
          }
          this.router.navigate(['login']);
        }
      })
    ) .subscribe(res => {
        this.productAdminService.getAllProducts().subscribe((products : Product[]) => {
        this.productTable = products;
        this.productAdminService.productTable.next(this.productTable);
        this.showOkMsg();
        });

      });

    this.loader = true;
  }


  savePopupImage():void{

    // parse my textArea in a JSON
    let text = "[" + this.popupProductValue + "]"
    console.log(text)
    let json : ImageProduct[] = JSON.parse(text);
    this.listImg = [];
    json.forEach((img: ImageProduct) => {
        this.listImg.push(img);
    });

    this.loader = false;
    this.productAdminService.saveProductImgs(this.listImg).pipe(
      tap( () => {}, err => {
        if(err instanceof HttpErrorResponse){
          if(err.status !== 401){
              this.showFailMsg();
              return;
          }
          this.router.navigate(['login']);
        }
      })
    ).subscribe(() => {

      this.productAdminService.getAllProducts().subscribe((products : Product[]) => {
        this.productTable = products;
        this.productAdminService.productTable.next(this.productTable);
        this.showOkMsg();
      });
      this.loader = true;

    });

    let currentProduct : any = this.productTable.find((product: Product) => product.productId = this.currentProductId);
    currentProduct.imagesProduct = json;

    this.productTable.forEach((product: Product) =>{
      if(product.productId === this.currentProductId){
        product = currentProduct;
      }
    })

    // hide popup
    this.hidePopupImage();

  }

  // CRUD
}




