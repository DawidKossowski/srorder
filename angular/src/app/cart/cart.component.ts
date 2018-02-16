import {Component, HostListener, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {Product} from '../product-list/product';
import { Router } from '@angular/router';
import { CartStorageService } from '../services/cart-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit, OnChanges {
  @Input() private showCart: boolean;
  @Output() public changeCartStatus = new EventEmitter<boolean>();
  private cartContent: Product[];
  private totalPrice = 0;

  constructor(private router: Router,
              private cartStorageService: CartStorageService) { }

  ngOnInit() {
    this.updateCart();
    this.cartContent.forEach( x => {
      this.totalPrice += x.price * x.amount;
    });
  }

  ngOnChanges() {
    this.updateCart();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //tu by mozna cos dac, zeby nie trzeba bylo dodawać kazdego kolejnego buttona do ignorowanych
    if (!( event.target.closest('.cart_content') || event.target.closest('.cartBtn') || event.target.closest('.deleteBtn') )) {
      this.changeCartStatus.emit(false);
    }
  }

  deleteItem(id) {
    this.cartContent = this.cartContent.filter(e => e.id !== id);
    this.updateStorage();
  }

  updateStorage() {
    this.cartStorageService.setItem('cart', JSON.stringify(this.cartContent));

    if (!this.cartContent.length) {
      this.totalPrice = 0;
    }
    this.cartContent.forEach( x => {
      this.totalPrice += x.price * x.amount;
    });
  }

  updateCart() {
    this.cartContent = JSON.parse(localStorage.getItem('cart'));
  }

  closeCart() {
    this.changeCartStatus.emit(false);
  }

  submitOrder() {
    this.router.navigateByUrl('/orderConfirmation');
  }
}
