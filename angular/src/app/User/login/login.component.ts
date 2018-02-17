import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(form: NgForm){
    console.log(this.email, this.password);
    this.userService.login(this.email, this.password);

  }
}
