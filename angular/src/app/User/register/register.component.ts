import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {NgForm} from "@angular/forms";
import {User} from "../User";
import {UserStorageService} from "../../services/user-storage.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name: string;
  public surname: string;
  public placeId: string;
  public email: string;
  public password: string;
  public sex: string;
  constructor( private userService: UserService, private userStorageService: UserStorageService) { }

  ngOnInit() {
  }

  setPlaceId(id: string) {
    this.placeId = id;
  }

  public Register(form: NgForm) {
    console.log(this.sex);
    this.userService.registerUser(this.sex, this.name, this.surname, this.email, this.password, this.placeId).catch();
    let user: User = new User();
    user.name = this.name;
    user.surname = this.surname;
    user.email = this.email;
    user.adress = this.placeId;
    this.userStorageService.setItem('currentUser', JSON.stringify(user) );
    //localStorage.setItem('currentUser', JSON.stringify(user));
    form.reset();
  }

}
