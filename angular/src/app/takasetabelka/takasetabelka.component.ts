import { Component, OnInit } from '@angular/core';
import {tableElement} from "./tableElement";

@Component({
  selector: 'app-takasetabelka',
  templateUrl: './takasetabelka.component.html',
  styleUrls: ['./takasetabelka.component.css']
})

export class TakasetabelkaComponent implements OnInit {
  public expandedElements: boolean[] = [false, false,false];

  public table = [{ id: 1, name: 'Adam', surname: 'Kowalski', details: 'details'},
    {id: 2, name: 'Maciek', surname: 'Nowak', details: 'details2'}] as tableElement[];
  constructor() { }

  ngOnInit() {
  }

  public expand(id: number) {
    this.expandedElements[id] = !this.expandedElements[id];
  }
}
