import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Custumer } from 'src/app/models/custumer';
import { CustumersAndOrdersHotels } from 'src/app/models/custumersAndOrdersHotels';
import { orderHotel } from 'src/app/models/orderHotel';
import { OrdersForCustumer } from 'src/app/models/ordersForCustumer';
import { CustumerService } from 'src/app/services/custumer.service';
import { OrderHotelService } from 'src/app/services/order-hotel.service';

@Component({
  selector: 'app-table-custumers',
  templateUrl: './table-order-custumers.component.html',
  styleUrls: ['./table-order-custumers.component.scss']
})
export class TableOrderCustumersComponent implements OnInit {
  ordersHotel: orderHotel[] = [];
  swNewOrder: boolean = false;
  custumeres: Custumer[] = [];

  addCustumerForOrder: boolean = false;
  orderToAdd: orderHotel = new orderHotel();
  custumersAndOrdersHotels: CustumersAndOrdersHotels[] = [];


  suucses: boolean = false;
  eror: boolean = false;
  messagesSuccess: Message[] = [{ severity: 'success', summary: 'ההזמנה נוספה בהצלחה ' }]
  messagesEror: Message[] = [{ severity: 'error', summary: 'שגיאה בעת הוספת הזמנה ' }];

  datesInvalid: boolean = false;

  editCstumer: boolean = false;

  editCustumerForOrder = new FormGroup({
    dateFrom: new FormControl(new Date(), [Validators.required]),
    dateTo: new FormControl(new Date(), [Validators.required]),
    sumPrice: new FormControl(0, Validators.required),
    roomNumber: new FormControl<number>(0, [Validators.required, Validators.minLength(3)])
  })

  orderForm = new FormGroup({
    // idOrderHotel: new FormControl('', [Validators.minLength(2)]), מספר רץ
    idHotel: new FormControl(1),
    idCustomer: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dateFrom: new FormControl('', [Validators.required]),
    dateTo: new FormControl('', [Validators.required]),
    // sumPrice: new FormControl(''),
    roomNumber: new FormControl<number>(0, [Validators.required, Validators.minLength(3)]),

  })
  submitted = false;
  isValid: boolean = false;
  constructor(private router: Router, private custumerService: CustumerService, private ordersHotelService: OrderHotelService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res;
      console.log(this.custumersAndOrdersHotels);

    })
  }
  editOrderForCustumer(orderAndCustumer: CustumersAndOrdersHotels) {
    console.log(orderAndCustumer);
    this.editCstumer = true;

    this.editCustumerForOrder.patchValue({
      dateFrom: orderAndCustumer.dateFrom,
      dateTo: orderAndCustumer.dateTo,
      sumPrice: orderAndCustumer.sumPrice,
      roomNumber: orderAndCustumer.roomNumber
    });
    console.log(this.editCustumerForOrder);

  }
  formatDate(date: Date): string {
    return date.toISOString().substring(0, 10);
  }
  saveOrderToEdit() {
    this.editCstumer = false;
  }
  validateDates() {
    const obgOrder = this.orderForm.getRawValue();
    const dateFrom = new Date(obgOrder.dateFrom!);
    const dateTo = new Date(obgOrder.dateTo!);

    if (dateFrom && dateTo) {
      this.datesInvalid = dateFrom > dateTo;
    }
  }
  addNewCustumer() {
    this.swNewOrder = true;
    this.addCustumerForOrder = true;
  }

  resetForm() {
    this.orderForm.reset();
  }
  chackCustumer(idCustomer: any) {
    this.custumerService.getCusrumers().subscribe(res => {
      this.custumeres = res
      console.log(this.custumeres);
      const exsit = this.custumeres.find(p => p.idCustomer == idCustomer)
      if (exsit) {
        console.log("מזהה קיים");
        this.isValid = true;
      }
      else {
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
  goToCustumersTable() {
    this.router.navigateByUrl('tableCustumers')
  }

  saveOrderChanges() {
    this.addCustumerForOrder = false;
    if (this.orderForm.valid) {
      const obgOrder = this.orderForm.getRawValue();
      this.orderToAdd.idCustomer = obgOrder.idCustomer!
      this.orderToAdd.dateFrom = new Date(Date.parse(obgOrder.dateFrom!));
      this.orderToAdd.dateTo = new Date(Date.parse(obgOrder.dateTo!));
      this.orderToAdd.idHotel = obgOrder.idHotel!
      this.orderToAdd.roomNumber = obgOrder.roomNumber!
      console.log(this.orderToAdd);
      // מכאן להוסיף בקשת שרת
      this.ordersHotelService.addOrderHotel(this.orderToAdd).subscribe(
        {
          next: (res) => {
            this.suucses = true;

            setTimeout(() => {
              this.suucses = false;
            }, 5000);
            this.custumersAndOrdersHotels = res;
            this.resetForm();
            this.orderToAdd.idHotel = 1
          },
          error: (err) => {
            this.eror = true;

            setTimeout(() => {
              this.eror = false;
            }, 5000);
          }


        }



      )

    }
  }


  finishOrder(custumersAndOrdersHotels: CustumersAndOrdersHotels) {
    console.log(custumersAndOrdersHotels);
    this.custumerService.UpdateStatus(custumersAndOrdersHotels).subscribe({
      next: (res) => {
        this.custumersAndOrdersHotels = res;
      },
      error: (err) => {

      }
    })
  }


}
