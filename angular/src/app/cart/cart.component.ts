import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from "../product-list/product";
import {logger} from "codelyzer/util/logger";
import {log} from "util";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  private showCart: boolean;
  private cartContent: Product[];
  private totalPrice: number;



  constructor() { }

  ngOnInit() {

    this.cartContent = JSON.parse(localStorage.getItem('cart'));
    this.cartContent.forEach( x => {
      this.totalPrice += (<number>(<number>x.price) * x.amount);

    });

    console.log(this.totalPrice.valueOf());
  }

  viewCart(event) {
    if (event.target.closest('.cart') || event.target.closest('.cartBtn')) {
      this.showCart = !this.showCart;
    } else {
      this.showCart = false;
    }
    return false;
  }

  close() {
    this.showCart = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //tu by mozna cos dac, zeby nie trzeba bylo dodawać kazdego kolejnego buttona do ignorowanych
    if (!( event.target.closest('.cart_content') || event.target.closest('.cartBtn') || event.target.closest('.deleteBtn') )) {
      this.showCart = false;
    }
  }

  deleteItem(id) {
    this.cartContent.splice(this.cartContent.indexOf(this.cartContent.find(x => x.id == id)), 1);
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartContent));
    this.cartContent.forEach( x => {
      this.totalPrice += x.price *x.amount;
    });
  }

}
