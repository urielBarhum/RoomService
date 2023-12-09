import { Component, OnInit } from '@angular/core';
import { Custumer } from 'src/app/models/custumer';
import { CustumerService } from 'src/app/services/custumer.service';

@Component({
  selector: 'app-custumer',
  templateUrl: './custumer.component.html',
  styleUrls: ['./custumer.component.scss']
})
export class CustumerComponent implements OnInit{
constructor(public custumer:CustumerService){}
custumeres!:Custumer[]
ngOnInit(): void {
this.custumer.getCustumers()
}
}
