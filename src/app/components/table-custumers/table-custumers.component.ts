import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Custumer } from 'src/app/models/custumer';
import { CustumerService } from 'src/app/services/custumer.service';

@Component({
  selector: 'app-table-custumers',
  templateUrl: './table-custumers.component.html',
  styleUrls: ['./table-custumers.component.scss']
})
export class TableCustumersComponent implements OnInit {
  custumeres: Custumer[] = []

  constructor(private custumerService: CustumerService) {
    this.custumerService.getCusrumers().subscribe(res => {
      this.custumeres = res;
      console.log(this.custumeres);
      console.log(this.custumeres[0].tzCustomer);
      
    });
  }
  ngOnInit(): void {

  }
}
