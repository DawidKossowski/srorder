import {Component, Input, OnInit} from '@angular/core';
import { User } from '../User/User';
import {UserAdressService} from "../services/user-adress.service";
import {customerService} from "../customer/service/customer.service";

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.css']
})
export class ChooseAddressComponent implements OnInit {

  public adresses: string[] = ['zgierz', 'lodz', 'wwa'];
  public chosen = -1;
  public name: string;
  public surname: string;
  public allAddress;
  public defaultAdress;
  public showAllAddress = false;


  constructor(private userAdressService: UserAdressService,
              private customerService: customerService) { }

  ngOnInit() {
    let user: User = new User();
    user = JSON.parse(localStorage.getItem('currentUser'));

    if(user) {
      this.name = user.name;
      this.surname = user.surname;
    }
    this.userAdressService.getAllUserAdress(user.id).then(e => this.allAddress = e);

    this.userAdressService.getUserAdress(user.id).then(e => {
      this.defaultAdress = e;
    });
  }

  showAllAddresses() {
    this.showAllAddress = true;

  }

  choose(id) {
    this.chosen = id;
    console.log(id);
  }
}
