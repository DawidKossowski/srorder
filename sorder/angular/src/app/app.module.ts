import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BikeService} from './bike.service';
import { BikesComponent } from './bikes/bikes.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    HeaderComponent,
    BikesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
