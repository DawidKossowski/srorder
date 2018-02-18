import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-google-maps-2',
  templateUrl: './google-maps-2.component.html',
  styleUrls: ['./google-maps-2.component.css']
})
export class GoogleMaps2Component implements OnInit {

  constructor(private ngZone: NgZone) {}

  @ViewChild('map') private mapElementRef: ElementRef;
  @ViewChild('search') private searchElementRef: ElementRef;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public map: google.maps.Map;
  public marker: google.maps.Marker;

  ngOnInit() {
    // set google maps defaults
    this.latitude = 52.22967560;
    this.longitude = 21.01222870;
    this.zoom = 8;

    // define map with marker
    this.map = new google.maps.Map(this.mapElementRef.nativeElement);
    this.marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map
    });

    this.updateMap();

    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ['address']
    });

    // load Places Autocomplete
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
        this.updateMap();
      });
    });
  }

  updateMap() {
    const position = new google.maps.LatLng(this.latitude, this.longitude);
    this.map.setZoom(this.zoom);
    this.map.setCenter(position);
    this.marker.setPosition(position);
  }
}
