import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { ProductService } from './product-list/service/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AppRoutingModule } from './app-routing.module';
import { NewProductService} from './new-product/service/new-product.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order/service/order.service';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { customerService } from "./customer/service/customer.service";
import {CartStorageService} from "./services/cart-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    NewProductComponent,
    OrderComponent,
    GoogleMapsComponent,
    CartComponent,
    OrderConfirmationComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7Ox1wwZHU2kECZIRvakG9nK0LmNgSKUM',
      libraries: ['places']
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ProductService, NewProductService, OrderService, customerService, CartStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
