import { Directive, ElementRef, HostListener,HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {

  constructor(el:ElementRef) {
    //el.nativeElement.addEventListener('click', this.createRipple, false);
  }

  //host: {
  //  '(click)': 'createRipple($event.target)'
  //}
  //HostListener 是属性装饰器，用来为宿主元素添加事件监听。

  @HostBinding('class.a-ripple') isRippleStart: boolean=true;

  @HostListener('mousedown',['$event'])
  createRipple(event) {
    let target = event.target;
    var rect = target.getBoundingClientRect();
    //let ripple = target.querySelector('.ripple');
   // if (!ripple) {
     var  ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height)*2.5 + 'px';
      target.appendChild(ripple);
   // }
    var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.style.transform = 'scale(1)';

    return false;
  }
  @HostListener('mouseup',['$event'])
  removeRipple(event) {

  }
}
