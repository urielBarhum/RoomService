import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-table-employees',
  templateUrl: './table-employees.component.html',
  styleUrls: ['./table-employees.component.scss']
})
export class TableEmployeesComponent implements OnInit {
  employees :employee[]=[]

constructor(private employeeService:EmployeeService, private router:Router){}
ngOnInit(): void {
  this.employeeService.getEmployees().subscribe( res =>{
    this.employees = res
  }

  )
}
}
