import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Custumer } from 'src/app/models/custumer';
import { CustumersAndOrdersHotels } from 'src/app/models/custumersAndOrdersHotels';
import { editOrder } from 'src/app/models/editOrder';
import { orderHotel } from 'src/app/models/orderHotel';
import { OrdersForCustumer } from 'src/app/models/ordersForCustumer';
import { CustumerService } from 'src/app/services/custumer.service';
import { OrderHotelService } from 'src/app/services/order-hotel.service';
// import { DatePipe } from '@angular/common';

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

  orderToChange:editOrder = new editOrder();
  suucses: boolean = false;
  eror: boolean = false;
  messagesSuccess: Message[] = [{ severity: 'success', summary: 'ההזמנה נוספה בהצלחה ' }]
  messagesEror: Message[] = [{ severity: 'error', summary: 'שגיאה בעת הוספת הזמנה ' }];

  datesInvalid: boolean = false;

  editCstumer: boolean = false;
  searchText: string = '';

  editCustumerForOrder = new FormGroup({
    idOrderHotel: new FormControl<number>(0),
    dateFrom: new FormControl<string | null>(null, [Validators.required]),
    dateTo: new FormControl<string | null>(null, [Validators.required]),
    sumPrice: new FormControl(0, Validators.required),
    roomNumber: new FormControl<number>(0, [Validators.required, Validators.minLength(3)])
  });

  orderForm = new FormGroup({
    // idOrderHotel: new FormControl('', [Validators.minLength(2)]), מספר רץ
    idHotel: new FormControl(1),
    idCustomer: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dateFrom: new FormControl(formatDate(new Date(), "dd-MM-yyyy", "en"),[Validators.required]),
    dateTo: new FormControl(formatDate(new Date(), "dd-MM-yyyy", "en"),[Validators.required]),
    // sumPrice: new FormControl(''),
    roomNumber: new FormControl<number>(0, [Validators.required, Validators.minLength(3)]),

  })
  submitted = false;
  isValid: boolean = false;
  constructor(private datePipe: DatePipe,private router: Router, private custumerService: CustumerService, private ordersHotelService: OrderHotelService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res;
      console.log(this.custumersAndOrdersHotels);

    })
  }
    
    applyFilter(): void {
      this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
        this.custumersAndOrdersHotels = res.filter(custumer =>
          custumer.tzCustomer.includes(this.searchText)
        )
      })
    }
    editOrderForCustumer(orderAndCustumer: CustumersAndOrdersHotels) {
      console.log(orderAndCustumer);
      this.editCstumer = true;
      const orderAndRoomServiceEdit: CustumersAndOrdersHotels = orderAndCustumer;
  
      const dateFromStr = this.datePipe.transform(orderAndRoomServiceEdit.dateFrom, 'yyyy-MM-dd');
      const dateToStr = this.datePipe.transform(orderAndRoomServiceEdit.dateTo, 'yyyy-MM-dd');
  
      this.editCustumerForOrder.patchValue({
        idOrderHotel: orderAndRoomServiceEdit.idOrderHotel,
        dateFrom: dateFromStr,
        dateTo: dateToStr,
        sumPrice: orderAndRoomServiceEdit.sumPrice,
        roomNumber: orderAndRoomServiceEdit.roomNumber
      });
      console.log(this.editCustumerForOrder);
    }
    
  formatDate(date: Date): string {
    return date.toISOString().substring(0, 10);
  }
  saveOrderToEdit() {
    console.log("צריך לממש");
    this.editCstumer = false;
    const orderTochange =  this.editCustumerForOrder.getRawValue();
    console.log(orderTochange);
    
    this.orderToChange.dateFrom =new Date(orderTochange.dateFrom!)
    this.orderToChange.dateTo =new Date(orderTochange.dateTo!)
    this.orderToChange.idOrderHotel =orderTochange.idOrderHotel!
    this.orderToChange.roomNumber =orderTochange.roomNumber!
console.log(this.orderToChange);

    
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
      this.orderToAdd.idHotel = 1 //obgOrder.idHotel!
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
