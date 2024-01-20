import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MainComponent } from './components/main/main.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { FooterMainComponent } from './components/footer-main/footer-main.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { OrderRoomServiceByCustumerComponent } from './components/order-room-service-by-custumer/order-room-service-by-custumer.component';
import { HeaderRoomServiceClientComponent } from './components/header-room-service-client/header-room-service-client.component';
import { MainRoomServiceClientComponent } from './components/main-room-service-client/main-room-service-client.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { TableModule } from 'primeng/table';
import { AdminComponent } from './admin/admin.component';
import { TableCustumersComponent } from './components/table-custumers/table-custumers.component';
import { TablePrimeComponent } from './components/table-prime/table-prime.component';
import { LogInAdminComponent } from './components/log-in-admin/log-in-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderMainComponent,
    FooterMainComponent,
    MenuComponent,
    LoginComponent,
    OrderRoomServiceByCustumerComponent,
    HeaderRoomServiceClientComponent,
    MainRoomServiceClientComponent,
    ProductComponent,
    ProductsComponent,
    AdminComponent,
    TableCustumersComponent,
    TablePrimeComponent,
    LogInAdminComponent,
    MenuAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    TableModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
