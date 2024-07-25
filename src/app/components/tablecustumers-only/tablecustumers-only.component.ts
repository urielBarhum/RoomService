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
  edit: boolean = false;
  custumeresForChack: Custumer[] = []

  suucses: boolean = false;
  eror: boolean = false;
  messagesSuccess: Message[] = [{ severity: 'success', summary: 'הלקוח נוסף בהצלחה ' }]
  messagesEror: Message[] = [{ severity: 'error', summary: 'שגיאה בעת הוספת לקוח ' }];

  isValid: boolean = false;
  isValidtz: boolean = false;
  suucsesEdit: boolean = false;
  erorEdit: boolean = false;
  messagesSuccessEdit: Message[] = [{ severity: 'success', summary: 'הלקוח נערך בהצלחה ' }]
  messagesErorEdit: Message[] = [{ severity: 'error', summary: 'שגיאה בעת עריכת לקוח ' }];

  custumerForm = new FormGroup({
    idCustomer: new FormControl('', [Validators.required, Validators.minLength(2)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl(''),
    numHoues: new FormControl(0),
    tzCustomer: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  custumerFormToEdit = new FormGroup({
    // idCustomer: new FormControl('', [Validators.required, Validators.minLength(4)]),
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
  editCustumer(custumer: Custumer) {
    this.edit = true;
    this.custumerFormToEdit.patchValue(custumer);
  }
  applyFilter(): void {
    this.custumerService.getCusrumers().subscribe(res => {
      this.tableCustumers = res.filter(custumer =>
        custumer.tzCustomer.includes(this.searchText) ||
        custumer.fullName.includes(this.searchText)
      );
    })
  }
  addNewOrder() {
    this.addOrderForCustumer = true;
  }
  chackId(idCustomer: any) {
    debugger
    this.custumerService.getCusrumers().subscribe(res => {
      this.custumeresForChack = res
      console.log(this.custumeresForChack);
      const exsit = this.custumeresForChack.find(p => p.idCustomer == idCustomer)
      if (exsit) {
        console.log("מזהה קיים");
        this.isValid = false;
      }
      else {
        console.log("מזהה לא קיים");
        this.isValid = true;

      }
    }
    )

  }
  chacktz(tzCustomer: any) {
    if (tzCustomer == "" || tzCustomer == null) {
      this.isValidtz = false;

    }
    else {

      this.custumerService.getCusrumers().subscribe(res => {
        this.custumeresForChack = res
        console.log(this.custumeresForChack);
        const exsit = this.custumeresForChack.find(p => p.tzCustomer == tzCustomer)
        if (exsit) {
          console.log("מזהה קיים");
          this.isValidtz = false;
        }
        else {
          console.log("מזהה לא קיים");
          this.isValidtz = true;

        }
      }
      )
    }
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
  saveChanges() {
    this.edit = false;
    if (this.custumerFormToEdit.valid) {
      const objCustumer = this.custumerFormToEdit.getRawValue();
      const custumerToEdit = new Custumer();
      // custumerToEdit.idCustomer = objCustumer.idCustomer!
      custumerToEdit.tzCustomer = objCustumer.tzCustomer!
      custumerToEdit.firstName = objCustumer.firstName!
      custumerToEdit.lastName = objCustumer.lastName!
      custumerToEdit.city = objCustumer.city!
      custumerToEdit.address = objCustumer.address!
      custumerToEdit.numHoues = objCustumer.numHoues!
      console.log(custumerToEdit);
      this.custumerService.editCustumer(custumerToEdit).subscribe({
        next: (res) => {
          this.tableCustumers = res;
          this.custumerFormToEdit.reset();
          this.suucsesEdit = true;
          setTimeout(() => {
            this.suucsesEdit = false;
          }, 5000);

        },
        error: (err) => {
          this.erorEdit = true;
          setTimeout(() => {
            this.erorEdit = false;
          }, 5000);
        }
      })


    }

  }
}
