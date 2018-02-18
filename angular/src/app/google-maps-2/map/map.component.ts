import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  constructor() { }

  @ViewChild('map') private mapElementRef: ElementRef;
  public map: google.maps.Map;
  public marker: google.maps.Marker;
  @Input() zoom: number;
  @Input() latiude: number;
  @Input() longitude: number;

  ngOnChanges() {
    if(!this.map) {
      this.map = new google.maps.Map(this.mapElementRef.nativeElement);
      this.marker = new google.maps.Marker({
        position: { lat: this.latiude, lng: this.longitude },
        map: this.map
      });
      this.updateMap();
    } else {
      this.updateMap();
    }
  }

  updateMap() {
    const position = new google.maps.LatLng(this.latiude, this.longitude);
    this.map.setZoom(this.zoom);
    this.map.setCenter(position);
    this.marker.setPosition(position);
  }
}
