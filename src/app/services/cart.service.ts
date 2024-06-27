import { Injectable } from '@angular/core';
import { cart } from '../models/cart';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 public myCart: cart[] = [];
  priceForAll: number = 0;
  idOrderHotel:number =0;
  private moneSubject = new BehaviorSubject<number>(0);
  mone$ = this.moneSubject.asObservable();

  get mone(): number {
    return this.moneSubject.value;
  }

  set mone(value: number) {
    this.moneSubject.next(value);
  }

  constructor(private http: HttpClient, private router: Router) { }
  addToCart(product: Product) {
    const exsiteProduct = this.myCart.find(item => item.productID == product.idProduct)
    if (exsiteProduct) {
      exsiteProduct.qtyProduct++
      exsiteProduct.priceForAll += product.priceProduct;
      this.priceForAll += product.priceProduct;
    }
    else {
      let comper: cart = new cart()
      comper.productID = product.idProduct
      comper.qtyProduct = 1
      comper.priceForAll = product.priceProduct
      comper.idOrderHotel= this.idOrderHotel
      this.myCart.push(comper);
      this.priceForAll += product.priceProduct;
    }
    this.mone = this.mone + 1;
    console.log(this.myCart);
    console.log(this.priceForAll);

  }
  subOne(product: Product) {
    const exsiteProduct = this.myCart.find(item => item.productID == product.idProduct)
    if (exsiteProduct) {
      this.priceForAll -= product.priceProduct
      if (exsiteProduct.qtyProduct > 1) {
        exsiteProduct.qtyProduct--
        exsiteProduct.priceForAll -= product.priceProduct
      }
      else {
        let index = this.myCart.findIndex(item => item.productID == product.idProduct)
        this.myCart.splice(index, 1)
      }
    }
    this.mone = this.mone - 1;
    console.log(this.myCart);
    console.log(this.priceForAll);


  }
  sendToServer(): void {
    let token = sessionStorage.getItem('token');
    let options = { headers: { "Authorization": token ?? "" } };
    this.http.post('https://localhost:44382/api/OrderRoomService/AddOrderRoomService', this.myCart, options).subscribe(s => {
      console.log(s)
      this.mone = 0;

      this.myCart = []
      this.priceForAll = 0;
      setTimeout(() => {
        
        this.router.navigateByUrl('orderRoomServiceByCustumer')
      }, 3000);
    })
  }

}
