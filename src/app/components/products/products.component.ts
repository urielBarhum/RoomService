import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnChanges {

  products: Product[] = []
  productFromChild!:Product 
  productsToCart :Product [] =[]
  cartProducts :cart []=[]
  priceForAll: number = 0
  ngOnChanges(changes: SimpleChanges): void {
  
  }
  constructor(private productService: ProductService, http: HttpClient) {
    productService.getProduct().subscribe(res => {
      this.products = res;
    });
  }
  productFromChildToSave(product :Product){
    this.productFromChild = product
    this.productsToCart.push(product);
    this.productsToCart.forEach(element => {
      this.priceForAll+= element.priceProduct
    });
  }
  sendToCart(){
    console.log(this.productsToCart);
    console.log(this.priceForAll);
    debugger;
    for (let index = 0; index < this.productsToCart.length; index++) {
      const element = this.productsToCart[index];
      
      const productExist = this.cartProducts.find(item => item.productID ===element.iDProduct)
      if(productExist){
        productExist.QTYProduct++
      }
      else{
        let comper: cart = new cart(this.productsToCart[index].iDProduct)
        this.cartProducts.push(comper)
        console.log(comper,comper.productID);
        
      }
    }
  
    console.log(this.cartProducts);
    
  }
  

}
