import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Custumer } from 'src/app/models/custumer';
import { CustumersAndOrdersHotels } from 'src/app/models/custumersAndOrdersHotels';
import { orderHotel } from 'src/app/models/orderHotel';
import { CustumerService } from 'src/app/services/custumer.service';
import { OrderHotelService } from 'src/app/services/order-hotel.service';

@Component({
  selector: 'app-table-custumers',
  templateUrl: './table-custumers.component.html',
  styleUrls: ['./table-custumers.component.scss']
})
export class TableCustumersComponent implements OnInit {
  custumeres: Custumer[] = [];
  ordersHotel: orderHotel[] = [];
  custumersAndOrdersHotels :CustumersAndOrdersHotels[]=[];
  constructor(private custumerService: CustumerService, private ordersHotelService: OrderHotelService) {
    console.log("i from table");
    
    this.custumerService.getCusrumers().subscribe(res => {
      this.custumeres = res;
    
    });
    this.ordersHotelService.getOrderHotel().subscribe(res => {
      this.ordersHotel = res;
      console.log(this.ordersHotel);

    });
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res;
      console.log(this.custumersAndOrdersHotels);
      
    })
  }
  ngOnInit(): void {

  }
  customSort(event: any, field: string) {
    event.data.sort((data1: any, data2: any) => {
      const value1 = parseFloat(data1[field]);
      const value2 = parseFloat(data2[field]);

      if (value1 < value2) {
        return event.order === 1 ? -1 : 1;
      } else if (value1 > value2) {
        return event.order === 1 ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
