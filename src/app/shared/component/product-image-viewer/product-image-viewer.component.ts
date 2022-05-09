import { Component, Input, OnInit } from '@angular/core';
import { ImageProduct } from '../../interfaces/Product.interface';

@Component({
  selector: 'app-product-image-viewer',
  templateUrl: './product-image-viewer.component.html',
  styleUrls: ['./product-image-viewer.component.scss']
})
export class ProductImageViewerComponent implements OnInit {

  @Input() images! : ImageProduct[];
  @Input() success: boolean = false;
  currentImg!: string;
  intervalId:any;

  constructor() {

   }

  ngOnInit(): void {
    this.intervalId = setInterval(() =>{
      if(this.images[0].productImgUrl){
        this.currentImg = this.images[0].productImgUrl;
        clearInterval(this.intervalId);
      }
    }, 500)

  }





  nextImg() :void{
    let index = 0;
      //busco el actual index de la img
      this.images.forEach((img, i) => {
        // asigno el i a la variable index

        if(img.productImgUrl === this.currentImg){
            index = i;
        }
      });



      if(index+1 <= this.images.length-1 && this.images[index+1].productImgUrl !== ""){
        this.currentImg = this.images[index+1].productImgUrl;
      }else{
        this.currentImg = this.images[0].productImgUrl;
      }
  }

  prevImg() : void{
    let index = 0;
    this.images.forEach((img,i) => {
      // asigno el index a la variable index
      if(img.productImgUrl === this.currentImg){
        index = i;
      }
    });

    if(index-1 >= 0){
      this.currentImg = this.images[index-1].productImgUrl
    }else if(this.images[this.images.length-1].productImgUrl !== ""){
      this.currentImg = this.images[this.images.length-1].productImgUrl
    }else{
      let lastImage = 0;
      this.images.forEach((image, i) => {
        if(image.productImgUrl !== ""){
          lastImage = i;
        }
      });
      this.currentImg = this.images[lastImage].productImgUrl;
    }
  }

}
