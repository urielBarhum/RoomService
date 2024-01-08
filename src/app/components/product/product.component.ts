import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { orderRoomService } from 'src/app/models/orderRoomService';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderRoomServiceService } from 'src/app/services/order-room-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product !: Product
  @Output() productEvent = new EventEmitter<Product>();
  priceForAll!: number ;

  constructor(private productService: ProductService, http: HttpClient, private orderRoomServices: OrderRoomServiceService,private cart:CartService
    ) { }
  add: number = 0;
  addOne() {
    this.add++;
    this.cart.addToCart(this.product)
    this.productEvent.emit(this.product);
    // this.orderRoomServices.addOrderRoomService(this.product.iDProduct)
    this.priceForAll = this.cart.priceForAll
  }
  subOne() {
    this.add--;
    this.cart.subOne(this.product);
    this.priceForAll = this.cart.priceForAll
    this.productEvent.emit(this.product);

    
  }
  removAll() {
    this.add = 0;
  }
}
