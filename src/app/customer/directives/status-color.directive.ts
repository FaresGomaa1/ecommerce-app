import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusColor]'
})
export class StatusColorDirective implements OnInit {
  @Input('appStatusColor') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    let color: string;
    switch (this.status) {
      case 'In Stock':
        color = 'green';
        break;
      case 'Out of Stock':
        color = 'red';
        break;
      case 'Last Piece':
        color = 'orange';
        break;
      default:
        color = 'black';
        break;
    }
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
