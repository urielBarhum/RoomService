import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Custumer } from 'src/app/models/custumer';
import { CustumerService } from 'src/app/services/custumer.service';

@Component({
  selector: 'app-tablecustumers-only',
  templateUrl: './tablecustumers-only.component.html',
  styleUrls: ['./tablecustumers-only.component.scss']
})
export class TablecustumersOnlyComponent {
  // custumeres: Custumer[] = [];
  tableCustumers: Custumer[] = []
  searchText: string = '';

  custumerToAdd: Custumer = new Custumer();
  addOrderForCustumer: boolean = false;



  suucses: boolean = false;
  eror: boolean = false;
  messagesSuccess: Message[] = [{ severity: 'success', summary: 'הלקוח נוסף בהצלחה ' }]
  messagesEror: Message[] = [{ severity: 'error', summary: 'שגיאה בעת הוספת לקוח ' }];



  custumerForm = new FormGroup({
    idCustomer: new FormControl('', [Validators.required, Validators.minLength(1)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl(''),
    numHoues: new FormControl(0),
    tzCustomer: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(private custumerService: CustumerService) {
    this.custumerService.getCusrumers().subscribe(res => {
      this.tableCustumers = res
      console.log(res);

    })
  }

  applyFilter(): void {
    this.custumerService.getCusrumers().subscribe(res => {
      this.tableCustumers = res.filter(custumer =>
        custumer.tzCustomer.includes(this.searchText)
      )
    })
  }
  addNewOrder() {
    this.addOrderForCustumer = true;
  }
  saveCustumerChanges() {
    debugger
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
      this.custumerService.addCustumer(this.custumerToAdd).subscribe(

        {
          next: (res) => {
            this.tableCustumers = res;
            this.custumerForm.reset();
            this.suucses = true;

            setTimeout(() => {
              this.suucses = false;
            }, 5000);

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

}
