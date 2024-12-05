import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductToServer } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators, NumberValueAccessor } from '@angular/forms';
import { EMPTY, catchError, of, tap } from 'rxjs';
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
  successEditProduct: boolean = false;
  successSaveProduct: boolean = false;
  errorDulicate: boolean = false;
  add: boolean = false;
  sidebarVisible: boolean = false;
  erorEditMaseeg!: Message[];
  erorSaveMaseeg !: Message[];
  successSaveMaseeg !: Message[];
  successEditMaseeg !: Message[];
  errorDulicateMassage!: Message[];
  searchText: string = '';
  currentImage: string = '';

  productForm = new FormGroup({
    nameProduct: new FormControl('', [Validators.minLength(2)]),
    descriptionProduct: new FormControl(''),
    manufacturer: new FormControl(''),
    qty: new FormControl(0, [Validators.required, Validators.min(1)]),
    priceProduct: new FormControl(0),
    productImage: new FormControl(null),
  });

  edit: boolean = false;

  productFormToEdit = new FormGroup({
    nameProduct: new FormControl('', [Validators.minLength(2)]),
    descriptionProduct: new FormControl(''),
    manufacturer: new FormControl(''),
    qty: new FormControl(0, [Validators.required, Validators.min(1)]),
    priceProduct: new FormControl(0, [Validators.required]),
    productImage: new FormControl(),
    idProduct: new FormControl(0),
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
    this.successEditMaseeg = [{ severity: 'success', summary: 'המוצר נערך מחדש בהצלחה ' }];
    this.erorSaveMaseeg = [{ severity: 'error', summary: 'שגיאה בעת הוספת המוצר לחנות ' }];
    this.successSaveMaseeg = [{ severity: 'success', summary: 'המוצר נוסף בהצלחה לחנות ' }];
    this.errorDulicateMassage = [{ severity: 'error', summary: 'המוצר קיים במלאי' }];



  }
  applyFilter(): void {
    this.productService.getProduct().subscribe(res => {
      this.products = res.filter(p =>
        p.nameProduct.includes(this.searchText)
      )
    })
  }
  openForm() {
    this.add = true;
  }
  deleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct).subscribe(
      res => {
        this.products = res
        alert("המוצר נמחק בהצלחה")

      }
    )
  }

  addProduct() {

    this.erorAddProduct = false;
    if (this.productForm.valid) {
      this.add = false;
      const objProduct = this.productForm.getRawValue()
      const productToAdd = new ProductToServer();
      productToAdd.nameProduct = objProduct.nameProduct!;
      productToAdd.descriptionProduct = objProduct.descriptionProduct;
      productToAdd.manufacturer = objProduct.manufacturer!
      productToAdd.qty = objProduct.qty!
      productToAdd.priceProduct = objProduct.priceProduct!
      productToAdd.productImage = objProduct.productImage!
      const formData = new FormData()
      formData.append('id', "0");
      formData.append('nameProduct', productToAdd.nameProduct);
      formData.append('descriptionProduct', productToAdd.descriptionProduct ?? "");
      formData.append('manufacturer', productToAdd.manufacturer);
      formData.append('qty', productToAdd.qty.toString());
      formData.append('priceProduct', productToAdd.priceProduct.toString())
      if (typeof productToAdd.productImage.name == "string") {
        formData.append('productImage', productToAdd.productImage, productToAdd.productImage.name)
        //debugger
      }
      //  debugger
      console.log(productToAdd);
      this.productService.addProduct(formData)
        .pipe(
          tap(() => {
            this.productForm.reset({
              nameProduct: '',
              descriptionProduct: '',
              manufacturer: '',
              qty: 0,
              priceProduct: 0,
              productImage: null,
            });
            (document.getElementById('productImage') as HTMLInputElement).value = '';
            this.successSaveProduct = true;
            setTimeout(() => {
              this.successSaveProduct = false;

            }, 5000);
          }),
          catchError(err => {
            console.error(err, err.error);
            if (err.error == 'המוצר קיים במלאי') {
              this.errorDulicate = true;

              setTimeout(() => {
                this.errorDulicate = false;
              }, 5000);
            }
            // else {
            //   this.erorAddProduct = true;

            //   setTimeout(() => {
            //     this.erorAddProduct = false;
            //   }, 5000);
            // }

            return EMPTY;
          })
        )
        .subscribe(res => {
          this.products = res
        })
    }




  }

  onImageSelected(event: any) {
    this.productForm.patchValue({ productImage: event.target.files[0] })
  }

  onImageSelectedInEdit(event: any) {
    this.productFormToEdit.patchValue({ productImage: event.target.files[0] })

  }






  // addProduct() {

  //   this.erorAddProduct = false;
  //   if (this.productForm.valid) {
  //     this.add = false;
  //     const objProduct = this.productForm.getRawValue()
  //     const productToAdd = new Product();
  //     productToAdd.nameProduct = objProduct.nameProduct!;
  //     productToAdd.descriptionProduct = objProduct.descriptionProduct;
  //     productToAdd.manufacturer = objProduct.manufacturer!
  //     productToAdd.qty = objProduct.qty!
  //     productToAdd.priceProduct = objProduct.priceProduct!
  //     productToAdd.productImage = objProduct.productImage
  //     console.log(productToAdd);
  //     this.productService.addProduct(productToAdd)
  //       .pipe(
  //         tap(() => {
  //           this.productForm.reset({
  //             nameProduct: '',
  //             descriptionProduct: '',
  //             manufacturer: '',
  //             qty: 0,
  //             priceProduct: 0,
  //             productImage: '',
  //           });
  //           this.successSaveProduct = true;
  //           setTimeout(() => {
  //             this.successSaveProduct = false;

  //           }, 5000);
  //         }),
  //         catchError(err => {
  //           console.error(err);
  //           this.erorAddProduct = true;
  //           setTimeout(() => {
  //             this.erorAddProduct = false;
  //           }, 5000);
  //           return EMPTY;
  //         })
  //       )
  //       .subscribe(res => {
  //         this.products = res
  //       })
  //   }


  // }












  editProduct(product: Product) {
    this.currentImage = product.productImage!;
    console.log("current => ", this.currentImage);

    this.erorEditProduct = false;
    console.log(product);
    this.productFormToEdit.patchValue(product)
    this.edit = true;

  }
  saveChanges() {
    this.edit = false;
    if (this.productFormToEdit.valid) {
      // this.add = false;
      const objProduct = this.productFormToEdit.getRawValue()
      const productToedit = new ProductToServer();
      productToedit.nameProduct = objProduct.nameProduct!;
      productToedit.descriptionProduct = objProduct.descriptionProduct;
      productToedit.manufacturer = objProduct.manufacturer!
      productToedit.qty = objProduct.qty!
      productToedit.priceProduct = objProduct.priceProduct!
      productToedit.productImage = objProduct.productImage!
      productToedit.idProduct = objProduct.idProduct!
      const formData = new FormData()
      formData.append('id', productToedit.idProduct.toString());
      formData.append('nameProduct', productToedit.nameProduct);
      formData.append('descriptionProduct', productToedit.descriptionProduct ?? "");
      formData.append('manufacturer', productToedit.manufacturer);
      formData.append('qty', productToedit.qty.toString());
      formData.append('priceProduct', productToedit.priceProduct.toString())
      if (typeof productToedit.productImage.name == "string") {
        formData.append('productImage', productToedit.productImage, productToedit.productImage.name)
      }
      formData.append('fileCurrentImage', this.currentImage)
      console.log(productToedit);
      this.productService.editProduct(formData).pipe(
        tap(() => {
          this.successEditProduct = true;
          setTimeout(() => {
            this.successEditProduct = false;

          }, 5000);
        }),
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
