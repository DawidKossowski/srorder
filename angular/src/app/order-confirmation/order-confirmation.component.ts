import { Component, OnInit } from '@angular/core';
import {customerService} from "../customer/service/customer.service";
import {NgForm} from '@angular/forms';
import {Product} from "../product-list/product";
import {ProductService} from "../product-list/service/product.service";
import {User} from "../User/User";
import {Http} from "@angular/http";
import {UserAdressService} from "../services/user-adress.service";

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

  public fullAdress: string;

  constructor(private customerService: customerService,
              private productService: ProductService,
              private userAdressService: UserAdressService,
              private http: Http) {}

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }


  SubmitOrder() {
    this.customerService.createCustomer(this.name, this.surname, this.placeId).catch();
    const _idToSend: Array<Number> = [];
    this.products.forEach(x=> {
        _idToSend.push(x.id);
    }    )
    this.productService.createOrder(_idToSend).catch();
  }

  test() {
    console.log(this.user.adress.id);
  }

  getNewAddressId(number: number) {
    this.user.adress.id = number;
  }
}
