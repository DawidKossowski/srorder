import { Component, OnInit } from '@angular/core';

import {NgForm} from "@angular/forms";
import {User} from "../User";
import {UserStorageService} from "../../services/user-storage.service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
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

  constructor(
              private userStorageService: UserStorageService,
              private router: Router,
              private http: Http) {
  }

  ngOnInit() {
  }

  setPlaceId(id: string) {
    this.placeId = id;
  }

  public Register(form: NgForm) {



      this.http.get('/api/registration', {
        params: {
          sex: this.sex,
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          adress: this.placeId
        }
      }).toPromise().then(response => {
        if (response.status === 200) {
          this.userStorageService.setItem('currentUser', JSON.stringify(response.json() as User));
          console.log(localStorage.getItem('currentUser'));
          form.reset();
          this.router.navigateByUrl('/list');
        } else {
          alert("something went wrong");
        }
      })



      // console.log(this.sex);
      /* this.userService.registerUser(this.sex, this.name, this.surname, this.email, this.password, this.placeId).catch();
       let user: User = new User();
       user.name = this.name;
       user.surname = this.surname;
       user.email = this.email;
       this.userStorageService.setItem('currentUser', user);
       //this.userStorageService.setItem('currentUser', JSON.stringify(this.userService.registerUser(this.sex, this.name, this.surname, this.email, this.password, this.placeId)) );
       console.log(localStorage.getItem('currentUser'));
       form.reset();
       this.router.navigateByUrl('/list');*/
    }


}
