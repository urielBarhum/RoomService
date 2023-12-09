import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ORSComponent } from './components/ors/ors.component';
import { MainComponent } from './components/main/main.component';
import { CustumerComponent } from './components/custumer/custumer.component';

const routes: Routes = [
  {path:"",component:MainComponent},
  {path :"orderRoomService", component:CustumerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
