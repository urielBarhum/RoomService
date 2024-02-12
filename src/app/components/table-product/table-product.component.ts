import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators, NumberValueAccessor } from '@angular/forms';
import { EMPTY, catchError, of } from 'rxjs';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
})
export class TableProductComponent implements OnInit {
  products: Product[] = [];
  erorAddProduct: boolean = false;
  erorEditProduct: boolean = false;
  add: boolean = false;
  sidebarVisible: boolean = false;
  erorEditMaseeg!: Message[] ;
  erorSaveMaseeg !: Message[];
  productForm = new FormGroup({
    nameProduct: new FormControl(''),
    descriptionProduct: new FormControl(''),
    manufacturer: new FormControl(''),
    qty: new FormControl(0),
    priceProduct: new FormControl(0, [Validators.required]),
    productImage: new FormControl(''),
  });

  edit: boolean = false;

  productFormToEdit = new FormGroup({
    nameProduct: new FormControl(''),
    descriptionProduct: new FormControl(''),
    manufacturer: new FormControl(''),
    qty: new FormControl(0),
    priceProduct: new FormControl(0, [Validators.required]),
    productImage: new FormControl(''),
    idProduct : new FormControl(0),
  });

  constructor(private router: Router, private productService: ProductService) {
    this.productService.getProduct().subscribe(
      res => {
        this.products = res;
        console.log(this.products);

      }
    )
  }
  ngOnInit(): void {
    this.erorEditMaseeg = [{ severity: 'error', summary: 'שגיאה בעת עריכת המוצר ' }];
    this.erorSaveMaseeg = [{ severity: 'error', summary: 'שגיאה בעת הוספת המוצר לחנות ' }];

  }
  openForm() {
    this.add = true;
  }
  deleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct).subscribe(
      res => {
        this.products = res
      }
    )
  }
  addProduct() {

    this.erorAddProduct = false;
    if (this.productForm.valid) {
      this.add = false;
      const objProduct = this.productForm.getRawValue()
      const productToAdd = new Product();
      productToAdd.nameProduct = objProduct.nameProduct!;
      productToAdd.descriptionProduct = objProduct.descriptionProduct;
      productToAdd.manufacturer = objProduct.manufacturer!
      productToAdd.qty = objProduct.qty!
      productToAdd.priceProduct = objProduct.priceProduct!
      productToAdd.productImage = objProduct.productImage
      console.log(productToAdd);
      this.productService.addProduct(productToAdd)
        .pipe(
          catchError(err => {
            console.error(err)
            this.erorAddProduct = true;
            setTimeout(() => {
              this.erorAddProduct = false;
          }, 5000);
            return EMPTY
          })
        )
        .subscribe(res => {
          this.products = res
        })
    }

    // this.productService.addProduct()
  }

  editProduct(product: Product) {
    this.erorEditProduct = false;
    console.log(product);
    this.productFormToEdit.patchValue(product)
    this.edit = true;

  }
  saveChanges() {
    this.edit = false;
    if (this.productFormToEdit.valid) {
      this.add = false;
      const objProduct = this.productFormToEdit.getRawValue()
      const productToedit = new Product();
      productToedit.nameProduct = objProduct.nameProduct!;
      productToedit.descriptionProduct = objProduct.descriptionProduct;
      productToedit.manufacturer = objProduct.manufacturer!
      productToedit.qty = objProduct.qty!
      productToedit.priceProduct = objProduct.priceProduct!
      productToedit.productImage = objProduct.productImage
      productToedit.idProduct = objProduct.idProduct!
      console.log(productToedit);
      this.productService.editProduct(productToedit).pipe(
        catchError(err => {
          console.error(err)
          this.erorEditProduct = true;
          setTimeout(() => {
           this.erorEditProduct = false;
        }, 5000);
          return EMPTY
        })
      )

        .subscribe(
          res => {
            this.products = res;
          }
        )
    }
  }
}
