import { Component, OnInit } from '@angular/core';
import { Order} from './order';
import {OrderService} from "./service/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  public orders: Array<Order>;
  public bolin = false;

  ngOnInit() {
    this.orderService.getOrders().then(orders => { this.orders = orders; console.log(this.orders); });
  }

  test() {
    this.bolin = !this.bolin;
  }
}
