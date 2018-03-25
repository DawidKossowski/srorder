import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrderComponent } from './order/order.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import {RegisterComponent} from "./User/register/register.component";
import {LoginComponent} from "./User/login/login.component";
import { StatisticComponent } from './statistic/statistic.component';
import {TakasetabelkaComponent} from "./takasetabelka/takasetabelka.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductListComponent },
  { path: 'newProduct', component: NewProductComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'map', component: GoogleMapsComponent },
  { path: 'orderConfirmation', component: OrderConfirmationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'takasetabelka', component: TakasetabelkaComponent}
];

@NgModule({
  exports: [ RouterModule ],

  imports: [
    RouterModule.forRoot(routes)
  ],

})
export class AppRoutingModule { }
