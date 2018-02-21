import { Component, OnInit } from '@angular/core';
import {customerService} from "../customer/service/customer.service";
import {NgForm} from '@angular/forms';
import {Product} from "../product-list/product";
import {ProductService} from "../product-list/service/product.service";
import {User} from "../User/User";
import {Http} from "@angular/http";
import {UserAddressService} from "../services/user-address.service";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  public name: string;
  public surname: string;
  public placeId: string;
  public products: Product[];
  public user: User;

  public fullAddress: string;

  constructor(private customerService: customerService,
              private productService: ProductService,
              private userAddressService: UserAddressService,
              private http: Http) {}

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  submitOrder() {
    const _idToSend: Array<Number> = [];
    this.products.forEach(x => {
      _idToSend.push(x.id);
    });

    this.productService.createOrder(_idToSend, this.user.name, this.user.surname);
  }


  getNewAddressId(number: number) {
    this.user.address.id = number;
  }
}
