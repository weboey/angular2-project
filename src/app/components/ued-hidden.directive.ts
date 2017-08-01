import { Directive, ElementRef, Input,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUedHidden]'
})
export class UedHiddenDirective {

  constructor(el: ElementRef,renderer2:Renderer2) {
    el.nativeElement.style.backgroundColor = 'yellow';
    //this.appStore.subscribe((state) => {
    //  this.zone.run(() => {
    //    console.log('enabled time travel');
    //  });
    //});
  }


}
