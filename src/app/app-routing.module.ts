import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { OrderRoomServiceByCustumerComponent } from './components/order-room-service-by-custumer/order-room-service-by-custumer.component';
import { TableCustumersComponent } from './components/table-order-custumers/table-order-custumers.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { LogInAdminComponent } from './components/log-in-admin/log-in-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { TableEmployeesComponent } from './components/table-employees/table-employees.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { MenuComponent } from './components/menu/menu.component';



const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "mainForAll", component: MainComponent },
  { path: "orderRoomServiceByCustumer", component: OrderRoomServiceByCustumerComponent },
  { path: "tableCustumers", component: TableCustumersComponent },
  { path: "tableEmployees", component: TableEmployeesComponent },
  { path: "tableProducts", component: TableProductComponent },
  { path: "market", component: ProductsComponent },
  { path: "logInCustumers", component: LoginComponent },
  { path: "logInAdmin", component: LogInAdminComponent },
  { path: "menuAdmin", component: MenuAdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
