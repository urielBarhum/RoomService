import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { Custumer } from 'src/app/models/custumer';
import { CustumersAndOrdersHotels } from 'src/app/models/custumersAndOrdersHotels';
import { orderHotel } from 'src/app/models/orderHotel';
import { CustumerService } from 'src/app/services/custumer.service';
import { OrderHotelService } from 'src/app/services/order-hotel.service';

@Component({
  selector: 'app-table-custumers',
  templateUrl: './table-order-custumers.component.html',
  styleUrls: ['./table-order-custumers.component.scss']
})
export class TableOrderCustumersComponent implements OnInit {
  custumeres: Custumer[] = [];
  ordersHotel: orderHotel[] = [];
  swNewOrder: boolean = false;
  addCustumerForOrder: boolean = false;
  addOrderForCustumer: boolean = false;

  custumerToAdd: Custumer = new Custumer();
  orderToAdd: orderHotel = new orderHotel();


  custumersAndOrdersHotels: CustumersAndOrdersHotels[] = [];

  custumerForm = new FormGroup({
    idCustomer: new FormControl('', [Validators.required, Validators.minLength(2)]),
    firstName: new FormControl('', [Validators.required ,Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    city: new FormControl('', [Validators.required,Validators.minLength(2)]),
    address: new FormControl(''),
    numHoues: new FormControl(0),
    tzCustomer: new FormControl('', [Validators.required , Validators.minLength(2)]),
  });
  orderForm = new FormGroup({
    // idOrderHotel: new FormControl('', [Validators.minLength(2)]), מספר רץ
    idHotel: new FormControl(1),
    idCustomer: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dateFrom: new FormControl('', [Validators.required]),
    dateTo: new FormControl('' , [Validators.required]),
    // sumPrice: new FormControl(''),
    roomNumber: new FormControl<number>(0 ,[Validators.required, Validators.minLength(3)]),

  })
  submitted = false;
  isValid: boolean = false;
  constructor(private custumerService: CustumerService, private ordersHotelService: OrderHotelService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res;
      console.log(this.custumersAndOrdersHotels);

    })
  }
  addNewCustumer() {
    this.swNewOrder = true;
    this.addCustumerForOrder = true;
  }
  addNewOrder() {
    this.addOrderForCustumer = true;
  }
  chackCustumer(idCustomer: any) {
    this.custumerService.getCusrumers().subscribe(res => {
      this.custumeres = res
      console.log(this.custumeres);      
      const exsit = this.custumeres.find(p => p.idCustomer == idCustomer)
      if(exsit){
        console.log("מזהה קיים");
        this.isValid = true;
      }
      else{
        console.log("מזהה לא קיים");    
        this.isValid = false;
      
      }
    }
    )
    // let exsit = this.custumerService.getCustumerById(tzCustomer).subscribe(
    //   (isValid => {
    //     if (isValid) {
    //       console.log('ת.ז קיים');
    //     } else {
    //       console.log('ת.ז לא קיים');
    //     }
    //   })
    // )
  }
  saveCustumerChanges() {
    this.addOrderForCustumer = false;
    if (this.custumerForm.valid) {
      const obgcustumer = this.custumerForm.getRawValue()
      this.custumerToAdd.idCustomer = obgcustumer.idCustomer!;
      this.custumerToAdd.firstName = obgcustumer.firstName!;
      this.custumerToAdd.lastName = obgcustumer.lastName!;
      this.custumerToAdd.city = obgcustumer.city!;
      this.custumerToAdd.address = obgcustumer.address!;
      this.custumerToAdd.numHoues = obgcustumer.numHoues!;

      this.custumerToAdd.tzCustomer = obgcustumer.tzCustomer!;
      console.log(this.custumerToAdd);
      //אולי לעשות מעבר ניווט לטבלה של האורחים
      this.custumerService.addCustumer(this.custumerToAdd).subscribe(res => {
        this.custumersAndOrdersHotels = res
      })



    }
  }

  saveOrderChanges() {
    this.addCustumerForOrder = false;
    if(this.orderForm.valid){
      const obgOrder = this.orderForm.getRawValue();
      this.orderToAdd.idCustomer = obgOrder.idCustomer!
      this.orderToAdd.dateFrom = new Date(Date.parse(obgOrder.dateFrom!));
      this.orderToAdd.dateTo = new Date(Date.parse(obgOrder.dateTo!));
      this.orderToAdd.idHotel = obgOrder.idHotel!
      this.orderToAdd.roomNumber = obgOrder.roomNumber!
      console.log(this.orderToAdd);
      // מכאן להוסיף בקשת שרת
      this.ordersHotelService.addOrderHotel(this.orderToAdd).subscribe(res =>{
        this.custumersAndOrdersHotels = res;
      })
    
    }
  }
}
