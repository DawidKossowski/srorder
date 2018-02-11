import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private showHide: boolean;
  private cartContent: String[];

  constructor() { }

  ngOnInit() {
    this.cartContent=['kaszanka', 'piguly'];
  }

  viewCart(event){
    if (event.target.closest('.cart')|| event.target.closest('.cartBtn')) {
      this.showHide = !this.showHide;
    } else {
      this.showHide = false;
    }
    return false;

  }

  close() {
    this.showHide= false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!( event.target.closest('.cart_content')|| event.target.closest('.cartBtn') )) {
      this.showHide = false;
    }
  }

}
