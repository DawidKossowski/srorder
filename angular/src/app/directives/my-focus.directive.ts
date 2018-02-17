import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[appMyFocus]'
})
export class MyFocusDirective implements OnChanges {

  @Input() appMyFocus: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer) {}

  ngOnChanges() {
    if (this.appMyFocus) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }

}
