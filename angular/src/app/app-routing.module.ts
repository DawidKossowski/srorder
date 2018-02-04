import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 
import { ProductListComponent } from './product-list/product-list.component'; 
import { NewProductComponent } from './new-product/new-product.component'; 
  
const routes: Routes = [ 
  { path: 'list', component: ProductListComponent }, 
  {path: 'newProduct', component: NewProductComponent} 
]; 
 
@NgModule({ 
  exports: [ RouterModule ],  
 
  imports: [ 
    RouterModule.forRoot(routes) 
  ], 
 
}) 
export class AppRoutingModule { } 