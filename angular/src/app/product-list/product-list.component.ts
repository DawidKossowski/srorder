import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './service/product.service';
import {logger} from "codelyzer/util/logger";

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
    if (event.target.checked === false) {
      if (!this.checked.find(e => e === true)) {
        this.checked = [];
      }
    }
  }

  submitOrder() {
    const _idToSend: Array<Number> = [];
    this.checked.forEach((el, index) => {
      if (el) {
        _idToSend.push(index);
      }
    });

    this.productService.createOrder(_idToSend).catch();
  }
}
