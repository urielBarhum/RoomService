import { Component } from '@angular/core';

@Component({
  selector: 'app-table-prime',
  templateUrl: './table-prime.component.html',
  styleUrls: ['./table-prime.component.scss'],
})
export class TablePrimeComponent {
  selectedProducts3!: Product[]
  products!: Product[];

  constructor(){
    this.products = [{id:1,name:'oriel'},{id:2,name:'yehuda'}]
  }

  viewSelect(){
    console.log("selects",this.selectedProducts3);
    
  }
}

export class Product{
  id!:number
  name!:string
}