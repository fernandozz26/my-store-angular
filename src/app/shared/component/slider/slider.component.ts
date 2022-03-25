import { Component, OnInit } from '@angular/core';
import {ImageType} from './interface/ImageType.interface';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {


  imgs: ImageType[] = [
    {index: 0, imgName: "Home", imgUrl: "https://m.media-amazon.com/images/I/61TvGBhz14L._SX3000_.jpg"},
    {index: 1, imgName: "Home", imgUrl: "https://m.media-amazon.com/images/I/71+CpSjz+LL._SX3000_.jpg"},
    {index: 2, imgName: "Home", imgUrl: "https://m.media-amazon.com/images/I/61qM42MG71L._SX3000_.jpg"},
    {index: 3, imgName: "Home", imgUrl: "https://media.istockphoto.com/photos/digital-eye-wave-lines-stock-background-stock-video-picture-id1226241649?b=1&k=20&m=1226241649&s=170667a&w=0&h=lXhD5bdn_YT50-ItctUnqB2WiGZ8Jye1GZHjvDsb2Xo="},
    {index: 4, imgName: "Home", imgUrl: "https://wallpaperaccess.com/full/84248.png"}
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
