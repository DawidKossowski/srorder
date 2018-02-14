import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrderComponent } from './order/order.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { CartComponent } from "./cart/cart.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'newProduct', component: NewProductComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'map', component: GoogleMapsComponent},
  { path: 'orderConfirmation', component: OrderConfirmationComponent}
];

@NgModule({
  exports: [ RouterModule ],

  imports: [
    RouterModule.forRoot(routes)
  ],

})
export class AppRoutingModule { }
