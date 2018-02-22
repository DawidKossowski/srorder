import {Component, HostListener, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {Product} from '../product-list/product';
import { Router } from '@angular/router';
import { CartStorageService } from '../services/cart-storage.service';
import {UserStorageService} from "../services/user-storage.service";
import {Http} from "@angular/http";
import {forEach} from "@angular/router/src/utils/collection";
import {User} from "../User/User";

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
              private userStorageService: UserStorageService,
              private http: Http) { }

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
    this.updateCart();
  }

  updateCart() {
    this.cartContent = JSON.parse(localStorage.getItem('cart'));
    if(this.isUserLogged) {
      this.saveCartInDBatOnce();
    }
    console.log(this.cartContent);
    this.totalPrice = 0;
    if (this.cartContent) {
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
      this.router.navigateByUrl('/orderConfirmation').catch();
      this.showCart = false;
    }
   else {
      this.router.navigateByUrl('/login').catch();
      this.showCart = false;
    }
  }

  saveCartInDBatOnce() {
    const _idToSend: Array<Number> = [];
    const _amountsToSend: Array<Number> = [];
    this.cartContent.forEach( x => {
      _idToSend.push(x.id);
      _amountsToSend.push(x.amount);
    });

    const parameters = {
      'productsIds': _idToSend,
      'amounts': _amountsToSend,
      'userId': (JSON.parse(localStorage.getItem('currentUser')) as User).id
    };

    this.http.post('/api/saveCartAtOnce', parameters) .toPromise()
      .then()
      .catch();
  }
}
