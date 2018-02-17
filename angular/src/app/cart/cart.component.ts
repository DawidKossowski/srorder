import {Component, HostListener, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {Product} from '../product-list/product';
import { Router } from '@angular/router';
import { CartStorageService } from '../services/cart-storage.service';
import {UserStorageService} from "../services/user-storage.service";

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
  private isUserLogged: boolean;

  constructor(private router: Router,
              private cartStorageService: CartStorageService,
              private userStorageService: UserStorageService) { }

  ngOnInit() {
    this.updateCart();
    if(localStorage.getItem('currentUser')) {
      this.isUserLogged = true;
    } else {
      this.isUserLogged = false;
    }
    this.userStorageService.watchStorage().subscribe( () => {
      if(localStorage.getItem('currentUser')) {
        this.isUserLogged = true;
      } else {
        this.isUserLogged = false;
      }
    })
  }

  ngOnChanges() {
    this.updateCart();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!( event.target.closest('.cart_content') || event.target.closest('.cartBtn') || event.target.closest('.deleteBtn') )) {
      this.closeCart();
    }
  }

  deleteItem(id) {
    this.cartContent = this.cartContent.filter(e => e.id !== id);
    this.updateStorage();
  }

  updateStorage() {
    this.cartStorageService.setItem('cart', JSON.stringify(this.cartContent));

    if (!this.cartContent) {
      this.totalPrice = 0;
    } else {
      this.cartContent.forEach( x => {
        this.totalPrice += x.price * x.amount;
      });
    }
  }

  updateCart() {
    this.cartContent = JSON.parse(localStorage.getItem('cart'));

    if (!this.cartContent) {
      this.totalPrice = 0;
    } else {
      this.cartContent.forEach( x => {
        this.totalPrice += x.price * x.amount;
      });
    }
  }

  closeCart() {
    this.changeCartStatus.emit(false);
  }

  submitOrder() {
    if(this.isUserLogged){
      this.router.navigateByUrl('/orderConfirmation');
      this.showCart = false;
    }
   else {
      this.router.navigateByUrl('/login');
      this.showCart = false;
    }
  }
}
