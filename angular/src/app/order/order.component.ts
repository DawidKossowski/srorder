import { Component, OnInit } from '@angular/core';
import { } from 'order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders: Array<Orders>;
  constructor() { }

  ngOnInit() {
  }

}
