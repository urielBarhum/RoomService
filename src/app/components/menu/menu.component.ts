import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  images:any[]=[]

    
  responsiveOptions!: any[];

  constructor(){}

  ngOnInit(): void {
    // const thumbnail = pGalleria.generateThumbnail('image.jpg', 200, 200);
    this.images=[
      
      {
        itemImageSrc: '../../../assets/hotelImg/dan1.jpeg',
        thumbnailImageSrc : '../../../assets/hotelImg/dan1s.jpg'
      },
      {

        itemImageSrc: '../../../assets/hotelImg/dan2.jpeg',
        thumbnailImageSrc : '../../../assets/hotelImg/dan2s.jpg'
      },
      {

        itemImageSrc: '../../../assets/hotelImg/dan3.jpeg',
        thumbnailImageSrc : '../../../assets/hotelImg/dan3s.jpg'
      },
      {

        itemImageSrc: '../../../assets/hotelImg/dan4.jpeg',
        thumbnailImageSrc : '../../../assets/hotelImg/dan4s.jpg'
      },
      {

        itemImageSrc: '../../../assets/hotelImg/dan5.jpeg',
        thumbnailImageSrc : '../../../assets/hotelImg/dan5s.jpg'
      }
    ];
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  
  }
}
