import { Component, OnInit } from '@angular/core';
import {customerService} from "../customer/service/customer.service";
import {NgForm} from '@angular/forms';
import {Product} from "../product-list/product";
import {ProductService} from "../product-list/service/product.service";
import {User} from "../User/User";
import {Http} from "@angular/http";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  public name: string;
  public surname: string;
  public placeId: string;
  public products: Product[];

  constructor(private customerService: customerService,
              private productService: ProductService,
              private http: Http) {}

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'));
    let user: User = new User();
    user = JSON.parse(localStorage.getItem('currentUser'));
    if(user) {
      this.name = user.name;
      this.surname = user.surname;



     this.http.get('/api/getUsersAdress', {params: {userId: user.id}})
        .toPromise()
        .then( response => {
          this.placeId = response.json().adress;
          this.setPlaceId(response.json().adress);
          console.log(this.placeId);
          console.log(response.json());

          var geocoder = new google.maps.Geocoder();


          geocoder.geocode({'placeId': response.json().adress}, function (results, status) {
            console.log(results);
          });
        }).catch(err => this.handleError(err));





  }}

  private handleError(error: any): void {
    if( error.status == 404 ) {
      alert("Wrong email");
    } else if (error.status === 406) {
      alert("wrong password");
    } else {
      alert(error.message);
    }

    //return Promise.reject(error.message || error);
  }

  setPlaceId(id: string) {
    this.placeId = id;
  }

  SubmitOrder() {
    this.customerService.createCustomer(this.name, this.surname, this.placeId).catch();
    const _idToSend: Array<Number> = [];
    this.products.forEach(x=> {
        _idToSend.push(x.id);
    }    )
    this.productService.createOrder(_idToSend).catch();
  }
}
