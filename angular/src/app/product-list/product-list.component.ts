import {Component, HostListener, OnInit} from '@angular/core';
import { Product } from './product';
import { ProductService } from './service/product.service';
import { CartStorageService } from '../services/cart-storage.service';
import { SortServiceService} from "../services/sort-service.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private products: Array<Product>;
  private productsToShow: Array<Product>;
  private productsToCart: Array<Product>;
  private productsName: Array<string> = [];
  public isInDropdown = false;
  public isArrowUp = false;
  public chosenSort= 'choose';

  constructor(private productService: ProductService,
              private cartStorageService: CartStorageService,
              private sortServiceService: SortServiceService) { }

  ngOnInit() {
    this.productService.getProducts().then(products => {
      this.products = products;
      this.productsToShow = this.products;
      products.filter(p => this.productsName.push(p.name));
    });
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

  getFilterResult(result: string) {
    if(result) {
      this.productsToShow = this.products.filter(p => p.name === result);
    } else {
      this.productsToShow = this.products;
    }
  }
  toggleStateDropdown(event) {
    if (event.target.closest('.dropdown-toggle')) {
      this.isInDropdown = !this.isInDropdown;
    } else {
      this.isInDropdown = false;
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.className !== 'dropdown-toggle') {
      this.isInDropdown = false;
    }

  }
  flipArrow() {
    this.isArrowUp = !this.isArrowUp;
    this.productsToShow.reverse();
  }

  alphabeticSort() {
    this.chosenSort = 'Alphabet';
    this.sortServiceService.sortAlphabetically().then(response=> {
      if(this.isArrowUp) {
        this.productsToShow = response;
      } else {
        this.productsToShow = response.reverse();
      }
    });
  }

  PriceSort() {
    this.chosenSort = 'Price';
    this.sortServiceService.sortByPrice().then(response=> {
      if(this.isArrowUp) {
        this.productsToShow = response;
      } else {
        this.productsToShow = response.reverse();
      }
    });
  }
}
