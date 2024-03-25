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
import { MainRoomServiceClientComponent } from './components/main-room-service-client/main-room-service-client.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { TableModule } from 'primeng/table';
import { AdminComponent } from './admin/admin.component';
import { TableOrderCustumersComponent } from './components/table-order-custumers/table-order-custumers.component';
import { LogInAdminComponent } from './components/log-in-admin/log-in-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { TableEmployeesComponent } from './components/table-employees/table-employees.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import {PasswordModule} from 'primeng/password';
import { MessagesComponentComponent } from './components/messages-component/messages-component.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { TableOrderRoomServiceComponent } from './components/table-order-room-service/table-order-room-service.component';
import { TablecustumersOnlyComponent } from './components/tablecustumers-only/tablecustumers-only.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderMainComponent,
    FooterMainComponent,
    MenuComponent,
    LoginComponent,
    OrderRoomServiceByCustumerComponent,
    MainRoomServiceClientComponent,
    ProductComponent,
    ProductsComponent,
    AdminComponent,
    TableOrderCustumersComponent,
    LogInAdminComponent,
    MenuAdminComponent,
    HeaderAdminComponent,
    TableEmployeesComponent,
    TableProductComponent,
    MessagesComponentComponent,
    HeaderUserComponent,
    TableOrderRoomServiceComponent,
    TablecustumersOnlyComponent,
 
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
    TableModule,
    ImageModule,
    GalleriaModule,
    SidebarModule,
    MessagesModule,
    PasswordModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
