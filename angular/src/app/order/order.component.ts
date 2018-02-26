import { Component, OnInit } from '@angular/core';
import { Order} from './order';
import { OrderService } from './service/order.service';
import { UserAddressService } from '../services/user-address.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService,
              private userAddressService: UserAddressService) { }

  public orders: Array<Order>;
  public formattedAdresses = [];
  public numberOrderDetails: number;

  ngOnInit() {
    this.orderService.getOrders().then(orders => {
      this.orders = orders;

      orders.forEach((e, index) => {
        this.userAddressService.transformPlaceIdToAddress(e.address.address).then(result => this.formattedAdresses.push(result));
      });

      console.log(this.formattedAdresses);
    });
  }

  showDetails(id: number) {
    if(id !== this.numberOrderDetails) {
      this.numberOrderDetails = id;
    } else {
      this.numberOrderDetails = -1;
    }
  }
}
