import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { CartStorageService } from "./services/cart-storage.service";
import { RegisterComponent } from './User/register/register.component';
import { LoginComponent } from './User/login/login.component';
import { UserStorageService } from "./services/user-storage.service";
import { AutoCompleterComponent } from './auto-completer/auto-completer.component';
import { ProductFilterComponent } from './product-list/product-filter/product-filter.component';
import { MyFocusDirective } from './directives/my-focus.directive';
import { GoogleMaps2Component } from './google-maps-2/google-maps-2.component';
import { MapComponent } from './google-maps-2/map/map.component';
import {UserAddressService} from "./services/user-address.service";
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import {SortServiceService} from "./services/sort-service.service";
import { StatisticComponent } from './statistic/statistic.component';
import { ChartsModule } from 'ng2-charts';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    NewProductComponent,
    OrderComponent,
    GoogleMapsComponent,
    CartComponent,
    OrderConfirmationComponent,
    RegisterComponent,
    LoginComponent,
    AutoCompleterComponent,
    ProductFilterComponent,
    MyFocusDirective,
    GoogleMaps2Component,
    MapComponent,
    ChooseAddressComponent,
    StatisticComponent
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
    AppRoutingModule,
    NgxCarouselModule,
    ChartsModule
  ],
  providers: [ProductService, NewProductService, OrderService, CartStorageService,
              UserStorageService, UserAddressService, SortServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
