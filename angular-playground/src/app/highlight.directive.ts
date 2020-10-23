import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(public el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('green');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
