import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import GeocoderResult = google.maps.GeocoderResult;


@Injectable()
export class UserAddressService {

  constructor(private http: Http) { }

  private geocoder = new google.maps.Geocoder();
  private defaultAddressUrl = '/api/getDefaultAddress';
  private allUsersAddressUrl = 'api/getUsersAddress';

  getPlaceIdByUserId(id: number) {
    return this.http.get(this.defaultAddressUrl, { params: { userId: id } })
      .toPromise()
      .then(response => response.text());
  }

  getUserAddress(id: number) {
    return new Promise(resolve => {
      this.getPlaceIdByUserId(id).then(response => {
        this.geocoder.geocode({'placeId': response }, function(results, status) {
           console.log(results);
           resolve(results);
        });
      });
    });
  }

  deliverAllUserAddress(id: number) {
    return this.http.get(this.allUsersAddressUrl, {params: {userId: id}})
      .toPromise()
      .then();

  }

  getAllUserAddress(id: number) {
    return new Promise(resolve => {
      this.deliverAllUserAddress(id).then(response => {
        const arrayToSend = [];

        response.json().forEach( (item, index) => {

          this.geocoder.geocode({'placeId': item.address }, function(results, status) {
            item.address = results;
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
