import { Component, OnInit } from '@angular/core';
import {customerService} from "../customer/service/customer.service";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  public name: string;
  public surname: string;
  public placeId: string;
  public products: string[];

  constructor(private customerService: customerService) { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'));
  }

  setPlaceId(id: string) {
    this.placeId = id;
  }

  SubmitOrder() {
    this.customerService.createCustomer(this.name, this.surname, this.placeId).catch();
    //tu przekleić cały order i od razu przypisanie customera do order
  }
}
