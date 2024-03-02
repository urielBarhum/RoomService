import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  images: any[] | undefined;


  responsiveOptions!: any[];

  constructor() { }

  ngOnInit(): void {
    // const thumbnail = pGalleria.generateThumbnail('image.jpg', 200, 200);
    this.images = [

      {
        itemImageSrc: '../../../assets/hotelImg/Hotel1.jpg',
        // thumbnailImageSrc : '../../../assets/hotelImg/Hotel1.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel2.jpg',
        // thumbnailImageSrc : '../../../assets/hotelImg/Hotel2.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel4.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel5.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel6.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel7.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel8.jpg'
      },
      {
        itemImageSrc: '../../../assets/hotelImg/Hotel9.jpg'
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
