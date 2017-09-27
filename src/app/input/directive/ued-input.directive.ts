import { Directive,ElementRef,Renderer2 } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Directive({
  selector: '[mdInput]',
  host: {
    'class': 'mat-input-element',
    '[id]': 'id',
    '[placeholder]': 'placeholder',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '(blur)': '_onBlur()',
    '(focus)': '_onFocus()',
    '(input)': '_onInput()',
  }
})
export class UedInputDirective {

  public name:string="ww";
  private pwd:string="qq";
  public focused = false;

  stateChanges = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
    console.log("ued-input!!!");
  }

  _onBlur(){
    console.log("_onBlur");
    this.focused=false;
    this.stateChanges.next();
  }
  _onFocus(){
    console.log("_onFocus");
    this.focused=true;
    this.stateChanges.next();
  }

  focus() { this._elementRef.nativeElement.focus(); }
}
