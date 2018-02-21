import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { User } from '../User/User';
import {UserAddressService} from "../services/user-address.service";
import {customerService} from "../customer/service/customer.service";

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.css']
})
export class ChooseAddressComponent implements OnInit {

  public addresses: string[] = ['zgierz', 'lodz', 'wwa'];
  public chosen = -1;
  public name: string;
  public surname: string;
  public allAddress;
  public defaultAddress;
  public showAllAddress = false;
  @Output() id = new EventEmitter<number>();

  constructor(private userAddressService: UserAddressService,
              private customerService: customerService) { }

  ngOnInit() {
    let user: User = new User();
    user = JSON.parse(localStorage.getItem('currentUser'));

    if(user) {
      this.name = user.name;
      this.surname = user.surname;
    }
    this.userAddressService.getAllUserAddress(user.id).then(e => this.allAddress = e);

    this.userAddressService.getUserAddress(user.id).then(e => {
      this.defaultAddress = e;
    });
  }

  showAllAddresses() {
    this.showAllAddress = true;

  }

  choose(id) {
    this.chosen = id;
    console.log(id);
  }

  save() {
    this.allAddress.filter(e => {
      if (e.id === this.chosen) {
        this.defaultAddress = e.address;

        this.id.emit(e.id);
      }
    });
    this.showAllAddress = false;

  }
}
