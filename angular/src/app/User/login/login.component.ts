import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {UserStorageService} from "../../services/user-storage.service";
import {User} from "../User";
import {Router} from "@angular/router";
import {Http} from "@angular/http";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(private userStorageService: UserStorageService,
              private router: Router,
              private http: Http) { }

  ngOnInit() {
  }

  login(form: NgForm){

    this.http.get('/api/login', {params : {
                                            email: this.email,
                                            password: this.password } })
      .toPromise()
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          this.userStorageService.setItem('currentUser', JSON.stringify(response.json() as User));
          console.log(localStorage.getItem('currentUser'));
          form.reset();
          this.router.navigateByUrl('/list');
        }
      }).catch(err => this.handleError(err));
  }

  private handleError(error: any): void {
    if( error.status == 404 ) {
      alert("Wrong email");
    } else if (error.status === 406) {
      alert("wrong password");
    } else {
      alert("something went wrong");
    }

    //return Promise.reject(error.message || error);
  }
}
