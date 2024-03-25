import { Component } from '@angular/core';
import { Custumer } from 'src/app/models/custumer';
import { CustumerService } from 'src/app/services/custumer.service';

@Component({
  selector: 'app-tablecustumers-only',
  templateUrl: './tablecustumers-only.component.html',
  styleUrls: ['./tablecustumers-only.component.scss']
})
export class TablecustumersOnlyComponent {
  tableCustumers: Custumer[] = []
  searchText: string = '';

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



}
