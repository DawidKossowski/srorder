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
      this.updateStorage();
    } else {
      this.isUserLogged = false;
    }

    this.userStorageService.watchStorage().subscribe( () => {
      if(localStorage.getItem('currentUser')) {
        this.isUserLogged = true;
        this.updateCart();

        if(this.cartContent != null) {
          this.mergeAndGet();
        }  else {
          this.get();
        }
      } else {
        this.isUserLogged = false;
      }
    });
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
    if(this.isUserLogged && this.cartContent!=null) {
      this.cartStorageService.saveCartInDB(this.cartContent);
    }
    this.updateCart();
  }

  updateCart() {
    this.cartContent = JSON.parse(localStorage.getItem('cart'));

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

 get() {
    this.cartStorageService.getCart().then( result=> {
      this.cartContent = result;
      this.updateStorage();
    });
 }


  mergeAndGet() {
    this.cartStorageService.mergeAndGetCart(this.cartContent).then( result => {
      this.cartContent = (result as Product[]);
      this.updateStorage();
    });
  }

}
