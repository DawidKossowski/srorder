import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { Product } from './product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public staticProducts: Array<Order> = [
    { id: 1, name: 'product1', price: 44.50, status: false },
    { id: 2, name: 'product2', price: 224.62, status: false },
    { id: 3, name: 'product3', price: 94, status: false },
    { id: 4, name: 'product4', price: 654.99, status: false }
  ];
  public products: Array<Product>;
  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

  initProducts() {
    this.productService.getProducts().then(products => this.products = products);
  }
  submitOrder() {
    console.log('x');
  }
}
