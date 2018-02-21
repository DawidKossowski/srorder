import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import GeocoderResult = google.maps.GeocoderResult;


@Injectable()
export class UserAdressService {

  constructor(private http: Http) { }

  private geocoder = new google.maps.Geocoder();
  private defaultAdressUrl = '/api/getDefaultAdress';
  private allUsersAddressUrl = 'api/getUsersAdress';

  getPlaceIdByUserId(id: number) {
    return this.http.get(this.defaultAdressUrl, { params: { userId: id } })
      .toPromise()
      .then(response => response.text());
  }

  getUserAdress(id: number) {
    return new Promise(resolve => {
      this.getPlaceIdByUserId(id).then(response => {
        this.geocoder.geocode({'placeId': response }, function(results, status) {
           console.log(results);
           resolve(results);
        });
      });
    });
  }

  deliverAllUserAdress(id: number) {
    return this.http.get(this.allUsersAddressUrl, {params: {userId: id}})
      .toPromise()
      .then();

  }

  getAllUserAdress(id: number) {
    return new Promise(resolve => {
      this.deliverAllUserAdress(id).then(response => {
        const arrayToSend = [];

        response.json().forEach( (item, index) => {

          this.geocoder.geocode({'placeId': item.adress }, function(results, status) {
            item.adress = results;
            arrayToSend.push(item);
            if (index === response.json().length - 1) {
              resolve(arrayToSend);
            }
          });
        });
      });
    });
  }
}
