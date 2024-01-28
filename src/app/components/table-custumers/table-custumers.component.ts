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
  constructor(private custumerService: CustumerService, private ordersHotelService: OrderHotelService) {}
  ngOnInit(): void {    
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res;
      console.log(this.custumersAndOrdersHotels);
      
    })
  }
 
}
