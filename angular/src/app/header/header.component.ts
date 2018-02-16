import {Component, HostListener, OnInit} from '@angular/core';
import { CartStorageService } from '../services/cart-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private cartStorageService: CartStorageService) { }

  private isIn = false;
  private isInDropdown = false;
  private isCartOpen = false;
  private amountProductsInCart: number;

  ngOnInit() {
    this.amountProductsInCart = JSON.parse(localStorage.getItem('cart')).length;
    this.cartStorageService.watchStorage().subscribe(() => {
      this.amountProductsInCart = JSON.parse(localStorage.getItem('cart')).length;
    });
  }

  toggleState() {
    this.isIn = !this.isIn;
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

  changeCart(status: boolean) {
    this.isCartOpen = status;
    return false;
  }

  setCartAmount() {
    this.amountProductsInCart = JSON.parse(localStorage.getItem('cart')).length;
  }
}
