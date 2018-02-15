import { Component, OnInit } from '@angular/core';
import {customerService} from "../customer/service/customer.service";
import {NgForm} from "@angular/forms";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  public name: string;
  public surname: string;
  public adress: string;

  constructor(private customerService: customerService) { }

  ngOnInit() {
  }

  SubmitOrder() {
    this.customerService.createCustomer(this.name, this.surname, this.adress).catch();
    //tu przekleić cały order i od razu przypisanie customera do order
  }

}
