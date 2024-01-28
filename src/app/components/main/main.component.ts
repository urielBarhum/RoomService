import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/models/Employee';
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
  constructor() {}
  ngOnInit(): void {
   
  }

}
