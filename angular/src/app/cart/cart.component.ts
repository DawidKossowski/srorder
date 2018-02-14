import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product} from "../product-list/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  @Input() private showCart: boolean;
  @Input() public changeCartStatus: Function;
  private cartContent: Product[];
  private totalPrice = 0;

  constructor() { }

  ngOnInit() {

    this.cartContent = JSON.parse(localStorage.getItem('cart'));
    this.cartContent.forEach( x => {
      this.totalPrice += x.price * x.amount;
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //tu by mozna cos dac, zeby nie trzeba bylo dodawać kazdego kolejnego buttona do ignorowanych
    if (!( event.target.closest('.cart_content') || event.target.closest('.cartBtn') || event.target.closest('.deleteBtn') )) {
      //this.showCart = false;
      this.changeCartStatus(false);
    }
  }

  deleteItem(id) {
    this.cartContent = this.cartContent.filter(e => e.id !== id);
    //this.cartContent.splice(this.cartContent.indexOf(this.cartContent.find(x => x.id == id)), 1);
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartContent));

    if (!this.cartContent.length) {
      this.totalPrice = 0;
    }
    this.cartContent.forEach( x => {
      this.totalPrice += x.price * x.amount;
    });
  }

}
