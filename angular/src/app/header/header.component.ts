import {Component, ElementRef, HostListener} from '@angular/core';

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

  toggleStateDropdown(event) {
    if (event.target.closest('.dropdown-toggle')) {
      this.isInDropdown = !this.isInDropdown;
    } else {
      this.isInDropdown = false;
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.className !== 'dropdown-toggle') {
      this.isInDropdown = false;
    }
  }
}
