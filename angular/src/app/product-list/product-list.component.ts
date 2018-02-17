import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './service/product.service';
import { CartStorageService } from '../services/cart-storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private products: Array<Product>;
  private productsToCart: Array<Product>;
  private checked: boolean[] = [];

  constructor(private productService: ProductService,
              private cartStorageService: CartStorageService) { }

  ngOnInit() {
    this.productService.getProducts().then(products => this.products = products);
  }

  addToCart(id: number) {
    this.productsToCart = JSON.parse(localStorage.getItem('cart')) || [];

      if(!this.productsToCart.find(p => p.id === id)) {
        const p: Product = Object.assign({}, this.products[id - 1]);
        p.amount = 1;
        this.productsToCart.push(p);
        localStorage.setItem('cart', JSON.stringify(this.productsToCart));
        this.cartStorageService.setItem('cart', JSON.stringify(this.productsToCart));
      } else {
        alert('This item is currently in cart.');
      }

  }
}
