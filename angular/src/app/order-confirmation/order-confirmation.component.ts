import { Component, OnInit } from '@angular/core';
import {Product} from "../product-list/product";
import {ProductService} from "../product-list/service/product.service";
import {User} from "../User/User";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  public products: Product[];
  public user: User;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  submitOrder() {
    const _idToSend: Array<Number> = [];
    this.products.forEach(x => {
      _idToSend.push(x.id);
    });
    this.productService.createOrder(_idToSend, this.user.id, this.user.address.id)
      .then( x => {
        alert("Order submitted");
      });

  }

  getNewAddressId(number: number) {
    this.user.address.id = number;
  }
}
