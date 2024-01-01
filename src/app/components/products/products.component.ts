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
  productsToSentToCart :Product [] =[]
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
    this.productsToSentToCart.push(product);
    // this.productsToSentToCart.forEach(element => {
    //   this.priceForAll+= element.priceProduct
    // });
  }
  sendToCart(){
    console.log(this.productsToSentToCart);
 
  debugger
    this.productsToSentToCart.forEach(element => {
      // console.log("this is the element ",element);
      const exsiteProduct = this.cartProducts.find(item => item.productID == element.idProduct)
      if(exsiteProduct){
        exsiteProduct.QTYProduct++
      }
      else{
       let comper: cart = new  cart()
        comper.productID = element.idProduct
        comper.QTYProduct = 1
        this.cartProducts.push(comper)
        console.log(comper );
        
      }
      
      
      
    });
    
  }

}



    // for (let index = 0; index < this.productsToSentToCart.length; index++) {
    //   const element = this.productsToSentToCart[index];
      
    //   const productExist = this.cartProducts.find(item => item.productID ===element.iDProduct)
    //   if(productExist){
    //     productExist.QTYProduct++
    //   }
    //   else{
    //    this.comper = {productID: this.productsToSentToCart[index].iDProduct ,QTYProduct: 1}
    //     this.cartProducts.push(this.comper)
    //     console.log(this.comper,this.comper.productID);
        
    //   }
    // }
  

    
  

