import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { orderRoomService } from 'src/app/models/orderRoomService';
import { Product } from 'src/app/models/product';
import { OrderRoomServiceService } from 'src/app/services/order-room-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product !: Product
  constructor(private productService: ProductService, http: HttpClient, private orderRoomServices: OrderRoomServiceService) { }
  add: number = 0;
  addOne() {
    this.add++;
    this.orderRoomServices.addOrderRoomService(this.product.iDProduct)
  }
  subOne() {
    this.add--;
  }
  removAll() {
    this.add = 0;
  }
}
