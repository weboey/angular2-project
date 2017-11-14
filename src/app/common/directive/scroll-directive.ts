import { Directive, ElementRef,Renderer2,AfterViewInit, HostListener,HostBinding, Input,Inject,NgZone} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Directive({
  selector: '[uedScroll]',
  host:{
    'class': 'ued-scroll'
  }
})
export class ScrollDirective implements AfterViewInit{

  constructor(private eleRef:ElementRef,
              private render:Renderer2,
              @Inject(PLATFORM_ID) private platformId : Object) {}

  ngAfterViewInit():void {
    if(isPlatformBrowser(this.platformId)){
      let nativeElement = this.eleRef.nativeElement;
      let scrollOffsetX=this._calcuScrollOffset(nativeElement);
      let scrollBox = nativeElement.querySelector(".mCustomScrollBox");
      this.render.setStyle(nativeElement, "marginRight", `-${scrollOffsetX}px`);
      this.render.setStyle(nativeElement, "paddingRight", `${scrollOffsetX}px`);
      scrollBox && this.render.setStyle(scrollBox, "max-width", `none`);
      scrollBox && this.render.setStyle(scrollBox, "marginRight", `-${scrollOffsetX}px`);
      scrollBox && this.render.setStyle(scrollBox, "paddingRight", `${scrollOffsetX}px`);
    }
  }

  private _calcuScrollOffset(el:HTMLElement):number{
    let rectBox = el.getBoundingClientRect();
    return document.documentElement.clientWidth-rectBox.right - 3;
  }
}
