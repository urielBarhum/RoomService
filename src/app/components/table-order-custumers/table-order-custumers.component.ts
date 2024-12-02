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

  orderToEdit: editOrder = new editOrder();

  suucses: boolean = false;
  eror: boolean = false;
  messagesSuccess: Message[] = [{ severity: 'success', summary: 'ההזמנה נוספה בהצלחה ' }]
  messagesEror: Message[] = []

  meseegeErorFromEdit: string = "";

  suucsesEdit: boolean = false;
  erorEdit: boolean = false;
  messagesSuccessEdit: Message[] = [{ severity: 'success', summary: 'ההזמנה נערכה בהצלחה ' }]
  messagesErorEdit: Message[] = [{ severity: 'error', summary: this.meseegeErorFromEdit }];

  datesInvalid: boolean = false;

  editCstumer: boolean = false;
  searchText: string = '';

  availableRooms: number[] = [];
  floor: number = 0;
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
    dateFrom: new FormControl(formatDate(new Date(), "dd-MM-yyyy", "en"), [Validators.required]),
    dateTo: new FormControl(formatDate(new Date(), "dd-MM-yyyy", "en"), [Validators.required]),
    // sumPrice: new FormControl(''),
    roomNumber: new FormControl<number>(0, [Validators.required, Validators.minLength(3)]),
  })
  submitted = false;
  isValid: boolean = false;


  constructor(private datePipe: DatePipe, private router: Router, private custumerService: CustumerService, private ordersHotelService: OrderHotelService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res;
      console.log(this.custumersAndOrdersHotels);

    })
  }
 
  applyFilter(): void {
    this.custumerService.getCustumersAndOrdersHotels().subscribe(res => {
      this.custumersAndOrdersHotels = res.filter(custumer =>
        custumer.tzCustomer.includes(this.searchText) ||
        custumer.fullName.includes(this.searchText)
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
    const orderTochange = this.editCustumerForOrder.getRawValue();
    console.log(orderTochange);

    this.orderToEdit.idOrderHotel = orderTochange.idOrderHotel!
    this.orderToEdit.dateFrom = new Date(orderTochange.dateFrom!)
    this.orderToEdit.dateTo = new Date(orderTochange.dateTo!)
    this.orderToEdit.roomNumber = orderTochange.roomNumber!
    this.orderToEdit.sumPrice = orderTochange.sumPrice!
    console.log(this.orderToEdit);
    this.ordersHotelService.editOrderHotel(this.orderToEdit).subscribe(
      res => {
        this.custumersAndOrdersHotels = res;
        this.suucsesEdit = true;
        setTimeout(() => {
          this.suucsesEdit = false;
        }, 5000); // מציג את ההודעה ל-5 שניות
      },
      error => {
        if (error.status === 450) {
          this.meseegeErorFromEdit = 'ההזמנה לא נמצאה';
        } else if (error.status === 451) {
          this.meseegeErorFromEdit = 'החדר תפוס בתאריכים שנבחרו ';
        } else if (error.status === 452) {
          this.meseegeErorFromEdit = 'יש בעיה עם התאריכים שנבחרו ';
        } else if (error.status === 453) {
          this.meseegeErorFromEdit = 'מספר הימים קטן מ 1 או מלון לא נמצא ';
        }
        else if (error.status === 470) {
          this.meseegeErorFromEdit = 'מספר החדר לא יכול להיות 0 ';
        }
        else {
          this.meseegeErorFromEdit = 'An unknown error occurred!';
        }
        this.erorEdit = true;
        this.messagesErorEdit = [{ severity: 'error', summary: this.meseegeErorFromEdit }];
        setTimeout(() => {
          this.erorEdit = false;
        }, 5000); // מציג את ההודעה ל-5 שניות
      }
    );

  }

  // validateDates() {
  //   const obgOrder = this.orderForm.getRawValue();
  //   const dateFrom = new Date(obgOrder.dateFrom!);
  //   const dateTo = new Date(obgOrder.dateTo!);

  //   if (dateFrom && dateTo) {
  //     this.datesInvalid = dateFrom > dateTo;
  //     this.getAvailableRooms(dateFrom, dateTo);
  //   }
  // }
  validateDates() {
    const obgOrder = this.orderForm.getRawValue();
    const dateFrom = new Date(obgOrder.dateFrom!);
    const dateTo = new Date(obgOrder.dateTo!);
    console.log(this.floor);
    // בדוק אם התאריכים קיימים
    if (dateFrom && dateTo) {
      // אם תאריך ההתחלה גדול מתאריך הסיום
      if (dateTo >= dateFrom) {
        this.datesInvalid = false;
        if (this.floor > 0) {
          this.getAvailableRooms(dateFrom, dateTo, this.floor);
        }

      }
      else {
        this.datesInvalid = true;
        this.availableRooms = []
      }
    }
    else {
      this.datesInvalid = false;
      this.availableRooms = []
    }
  }

  getAvailableRooms(dateFrom: Date, dateTo: Date, floorCustumerChuse: number): void {
    this.ordersHotelService.GetAvailableRooms(dateFrom, dateTo, floorCustumerChuse).subscribe(
      res => {
        this.availableRooms = res;
        console.log(this.availableRooms);

      }
    )
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
  onRoomNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = parseInt(inputElement.value, 10);

    if (value < 1) {
      this.floor = 1;
      inputElement.value = '1';
    } else if (value > 10) {
      this.floor = 10;
      inputElement.value = '10';
    } else {
      this.floor = value;
    }
    console.log(this.floor);

  }

}
