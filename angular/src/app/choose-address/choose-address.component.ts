import {Component, Input, OnInit} from '@angular/core';
import {UserAdressService} from "../services/user-adress.service";

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.css']
})
export class ChooseAddressComponent implements OnInit {

public adresses: string[] = ['zgierz', 'lodz', 'wwa'];
public chosen: string;
 public allAddress: string[];

  constructor(private userAdressService: UserAdressService) { }

  ngOnInit() {
    //this.adresses = this.userAdressService.getAllUserAdress(2);przepisac wyniki
    console.log(this.userAdressService.getAllUserAdress(2));;
  }





}



