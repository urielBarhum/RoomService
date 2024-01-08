import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { OrderRoomServiceByCustumerComponent } from './components/order-room-service-by-custumer/order-room-service-by-custumer.component';
import { TableCustumersComponent } from './components/table-custumers/table-custumers.component';



const routes: Routes = [
  {path: "" ,component:MainComponent},
  {path : "orderRoomServiceByCustumer", component:OrderRoomServiceByCustumerComponent},
  {path : "tableCustumers" , component:TableCustumersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
