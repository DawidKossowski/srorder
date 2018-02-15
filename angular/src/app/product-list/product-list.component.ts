import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private products: Array<Product>;
  private productsToCart: Array<Product>;
  private checked: boolean[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().then(products => this.products = products);
  }

  addToCart(id: number) {
    this.productsToCart = JSON.parse(localStorage.getItem('cart'));
    if(!this.productsToCart.find(p => p.id === id)) {
      const p: Product = Object.assign({}, this.products[id - 1]);
      p.amount = 1;
      this.productsToCart.push(p);
      localStorage.setItem('cart', JSON.stringify(this.productsToCart));
    } else {
      alert('This item is currently in cart.');
    }
  }

  updateChecked(option, event) {
    this.checked[option] = event.target.checked;
    if (event.target.checked === false) {
      if (!this.checked.find(e => e === true)) {
        this.checked = [];
      }
    }
  }

  // stare tworzenie zamowien, zostawiam dla wzoru
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
