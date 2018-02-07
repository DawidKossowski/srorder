import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() { }

  isIn = false;
  isInDropdown = false;

  toggleState() {
    this.isIn = !this.isIn;
  }

  toggleStateDropdown() {
    this.isInDropdown = !this.isInDropdown;
    return false;
  }
}
