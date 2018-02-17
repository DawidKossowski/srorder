import {Component, HostListener, OnInit} from '@angular/core';
import { CartStorageService } from '../services/cart-storage.service';
import { UserStorageService } from "../services/user-storage.service";
import { User } from "../User/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private cartStorageService: CartStorageService,
              private userStorageService: UserStorageService) { }

  private isIn = false;
  private isInDropdown = false;
  private isCartOpen = false;
  private amountProductsInCart: number = 0;
  private isUserLogged = false;
  private Username: string;
  private isUserMenuInDropdown = false;

  ngOnInit() {
    if(JSON.parse( localStorage.getItem('cart'))!= null) {
      this.amountProductsInCart = JSON.parse( localStorage.getItem('cart')).length;
    }
    if(JSON.parse( localStorage.getItem('currentUser')) ){
      if( this.Username = ( JSON.parse( localStorage.getItem('currentUser')) as User ).name) {
        this.isUserLogged = true;
      }
      else {
        this.isUserLogged=false;
      }
    }

    this.cartStorageService.watchStorage().subscribe(() => {
      if(JSON.parse( localStorage.getItem('cart')) != null) {
        this.amountProductsInCart = JSON.parse( localStorage.getItem('cart')).length;
      }
    });

    this.userStorageService.watchStorage().subscribe( () => {

      if(JSON.parse( localStorage.getItem('currentUser')) ){
        if( this.Username = ( JSON.parse( localStorage.getItem('currentUser')) as User ).name) {
          this.isUserLogged = true;
        }
        else {
          this.isUserLogged=false;
        }
      }
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

  toggleStateDropdownUserMenu(event) {
    if (event.target.closest('.Userdropdown-toggle')) {
      this.isUserMenuInDropdown = !this.isUserMenuInDropdown;
    } else {
      this.isUserMenuInDropdown = false;
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.className !== 'dropdown-toggle') {
      this.isInDropdown = false;
    }
    if(event.target.className !== 'Userdropdown-toggle') {
      this.isUserMenuInDropdown = false;
    }
  }

  changeCart(status: boolean) {
    this.isCartOpen = status;
    return false;
  }

  setCartAmount() {
    this.amountProductsInCart = JSON.parse(localStorage.getItem('cart')).length;
  }

  Logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
}
