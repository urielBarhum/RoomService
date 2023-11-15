import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Custumer } from 'src/app/models/custumer';
import { CustumerService } from 'src/app/services/custumer.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private employeesService: EmployeeService, private custumerService: CustumerService) {

  }
  custumers !: Custumer[]
  employees !: Employee[]
  ngOnInit(): void {
    this.custumerService.getCustumers().subscribe((c: Custumer[]) => {
      this.custumers = c;
    }
    )
    this.employeesService.getEmployees().subscribe((e: Employee[]) => {
         this.employees = e;
    }
    )
  }

}
