import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Array<Product>;
  public checked: boolean[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().then(products => this.products = products);
  }

  updateChecked(option, event) {
    this.checked[option] = event.target.checked;
  }

  submitOrder() {
  }
}
