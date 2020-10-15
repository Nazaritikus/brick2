import {Directive, ElementRef, HostBinding, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Directive({
  selector: '[bgControl]'
})
export class BgControlDirective implements OnInit{

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private actvRoute: ActivatedRoute
  ) { }

  @HostBinding('class') elClass;
  ngOnInit(): void {
    this.actvRoute.params.subscribe(params => {
      console.log(this.el.nativeElement)
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red')
    })

  }

}
