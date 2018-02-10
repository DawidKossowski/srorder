import { Component, OnInit } from '@angular/core';
import { Order} from './order';
import {OrderService} from "./service/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders: Array<Order>;
  //public orders: Array<string>;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().then(orders => this.orders = orders);
  }
}
