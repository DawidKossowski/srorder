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
    if (event.target.checked === false) {
      if (!this.checked.find(e => e === true)) {
        this.checked = [];
      }
    }
  }

  submitOrder() {
    const _idToSend: Array<Number> = [];
    const _productToCart: Array<Product> = [];
    this.checked.forEach((el, index) => {
      if (el) {
        _idToSend.push(index);
        const p: Product = Object.assign({}, this.products[index - 1]);
        p.amount = 1;
        _productToCart.push(p);
      }
    });

    this.productService.createOrder(_idToSend).catch();
    localStorage.setItem('cart', JSON.stringify(_productToCart));
  }
}
