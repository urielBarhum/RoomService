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
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderMainComponent,
    FooterMainComponent
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
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
