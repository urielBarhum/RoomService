import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Custumer } from 'src/app/models/custumer';
import { Hotel } from 'src/app/models/hotel';
import { CustumerService } from 'src/app/services/custumer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private employeesService: EmployeeService, private custumerService: CustumerService, private hotelService:HotelService) {

  }
  custumers !: Custumer[]
  employees !: Employee[]
  hotels !:Hotel[]
  ngOnInit(): void {
this.hotelService.getHotels().subscribe((h:Hotel[])=>{
  this.hotels= h;
})



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
