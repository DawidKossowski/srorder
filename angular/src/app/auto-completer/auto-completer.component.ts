import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { MyFocusDirective } from '../directives/my-focus.directive';


@Component({
  selector: 'app-auto-completer',
  templateUrl: './auto-completer.component.html',
  styleUrls: ['./auto-completer.component.css']
})
export class AutoCompleterComponent implements OnInit {

  constructor() { }

  @Input() private arrayToFilter;
  @Input() inputId: string;
  @Output() private sendResult = new EventEmitter<string>();
  public focusedIdx = -1;
  public results: Array<string>;
  public val: string;

  ngOnInit() {
  }
  filter() {
    this.results = this.arrayToFilter.filter(e => e.includes(this.val));
  }
  onPressKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      if (this.focusedIdx === this.results.length - 1) {
        this.focusedIdx = 0;
      } else {
        this.focusedIdx++;
      }
    } else if (event.key === 'ArrowUp') {
      if (!(this.focusedIdx === -1)) {
        this.focusedIdx--;
      }} else if (event.key === 'Enter') {
      this.val = this.results[this.focusedIdx];
      this.results = [];
      this.focusedIdx = -1;
      this.sendResult.emit(this.val);
    }
  }

  mouseClick(selected: string) {
    this.val = selected;
    this.focusedIdx = -1;
    this.sendResult.emit(this.val);
  }

  @HostListener('document:click', ['$event'])
  clear(event: Event) {
    this.results = [];
  }
}
