import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
})
export class TableProductComponent implements OnInit {
  products: Product[] = [];
  add: boolean = false;
  sidebarVisible: boolean = false;
  profileForm = new FormGroup({
    nameProduct: new FormControl(''),
    descriptionProduct: new FormControl(''),
    manufacturer: new FormControl(''),
    qTY: new FormControl(''),
    priceProduct: new FormControl(''),
    productImage: new FormControl(''),
  });

  constructor(private router: Router, private productService: ProductService) {
    // this.productService.getProduct().subscribe(
    //   res =>{
    //     this.products = res;
    //   }
    // )
  }
  ngOnInit(): void {
    this.products = this.productService.productsService;
    console.log(this.products);
  }
  openForm() {
    this.add = true;
  }
  addProduct() {
    this.add = false;
    this.sidebarVisible =false
  }
}
