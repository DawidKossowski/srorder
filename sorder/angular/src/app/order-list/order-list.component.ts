import { Component, OnInit } from '@angular/core';
import { Order } from './order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orders: Array<Order> = [
    { id: 1, name: 'product1', price: 44.50, status: false },
    { id: 2, name: 'product2', price: 224.62, status: false },
    { id: 3, name: 'product3', price: 94, status: false },
    { id: 4, name: 'product4', price: 654.99, status: false }
  ];

  constructor() { }

  ngOnInit() {
  }
  submitOrder() {
    console.log(this.orders[0].status);
  }
}
