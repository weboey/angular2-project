import { Directive, ElementRef, HostListener,HostBinding, Input,NgZone} from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {

  constructor(private el:ElementRef,private _ngZone: NgZone) {}

  private _activeRipples = new Set<HTMLElement>();

  //host: {
  //  '(click)': 'createRipple($event.target)'
  //}
  //HostListener 是属性装饰器，用来为宿主元素添加事件监听。
  _isMousedown:boolean=true;

  @HostBinding('class.a-ripple') isRippleStart: boolean=true;

  @HostListener('mousedown',['$event'])
  private createRipple(event) {
    this._isMousedown=true;
    let target = event.target;
    var rect = target.getBoundingClientRect();
    let  ripple:HTMLElement = document.createElement('div');
    ripple.className = 'ripple';
    let radius = this.calcuRippleRect(event.pageX,event.pageY,rect);
    ripple.style.height = ripple.style.width = `${radius * 2}px`;
    target.appendChild(ripple);
    var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.style.transform = 'scale(1)';
    this._activeRipples.add(ripple);
    this.runTimeoutOutsideZone(() => {
      if (!this._isMousedown) {
        this.fadeOutRipple(ripple)
      }
    }, 2000);
    return false;
  }

  @HostListener('mouseup',['$event'])  // removeRipple(event) {}
  private onMouseup() {
    this._isMousedown = false;
    this._activeRipples.forEach(ripple => {
      this.fadeOutRipple(ripple);
    });
  }

  private fadeOutRipple(rippleRef) {
    if (!this._activeRipples.delete(rippleRef)) {
      return;
    }
    let rippleEl = rippleRef;
    rippleEl.style.transitionDuration = '780ms';
    rippleEl.style.opacity = '0';

    this.runTimeoutOutsideZone(() => {
      rippleEl.parentNode!.removeChild(rippleEl);
    }, 2000);
  }

  private runTimeoutOutsideZone(fn: Function, delay = 0) {
    this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
  }

  private calcuRippleRect(x: number, y: number, rect: ClientRect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }
}
