import { Directive, ElementRef, HostListener, Input} from '@angular/core';

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



  @HostListener('click',['$event'])
  createRipple(event) {
    let target = event.target;
    target.classList.add("a-ripple");
    var rect = target.getBoundingClientRect();
    let ripple = target.querySelector('.ripple');
    if (!ripple) {
      ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');

    setTimeout(()=>{
      target.removeChild(ripple);
    },1000);
    return false;
  }

}
