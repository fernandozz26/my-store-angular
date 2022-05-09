import { Component, OnInit } from '@angular/core';
import {ImageType} from './interface/ImageType.interface';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {


  imgs: ImageType[] = [
    {index: 0, imgName: "Home", imgUrl: "https://images8.alphacoders.com/413/thumb-1920-413078.jpg"},
    {index: 1, imgName: "Home", imgUrl: "https://wallpapercave.com/wp/y0AncG6.jpg"},
    {index: 2, imgName: "Home", imgUrl: "https://www.wallpaperup.com/uploads/wallpapers/2019/04/22/1320284/3095b8c1e2c040253fda3973695d0ca9-700.jpg"},
    {index: 3, imgName: "Home", imgUrl: "https://www.wallpaperup.com/uploads/wallpapers/2019/12/04/1358222/3dd8b27fd3ba82b3b9d5de0b2f756717.jpg"},
    {index: 4, imgName: "Home", imgUrl: "https://p4.wallpaperbetter.com/wallpaper/971/510/380/draft-beer-wallpaper-preview.jpg"}
  ];

  currentImg: string = "";

  intervalID : any;


  constructor() { }

  ngOnInit(): void {
    this.currentImg = this.imgs[0].imgUrl;
    this.start();
  }

  nextImg() :void{
    let index = 0;
      //busco el actual index de la img
      this.imgs.forEach(img => {
        // asigno el index a la variable index

        img.imgUrl === this.currentImg ? index = img.index : null;
      });

      if(index+1 <= this.imgs.length-1){
        this.currentImg = this.imgs[index+1].imgUrl;
      }else{
        this.currentImg = this.imgs[0].imgUrl
      }
  }

  prevImg() : void{
    let index = 0;
    this.imgs.forEach(img => {
      // asigno el index a la variable index
      img.imgUrl === this.currentImg ? index = img.index : null;
    });

    index-1 >= 0 ? (this.currentImg = this.imgs[index-1].imgUrl) : (this.currentImg = this.imgs[this.imgs.length-1].imgUrl);
  }

  setCurrentImg(index:number) : void{
    this.currentImg = this.imgs[index].imgUrl;
  }

  start() : void{
    this.intervalID = window.setInterval(() =>this.nextImg(),10000);
  }

  stop() :void{
    clearInterval(this.intervalID);
  }




}
