import { Component,
  OnInit,DoCheck,OnChanges,AfterContentInit,
  SimpleChanges,ViewEncapsulation,
  ContentChild } from '@angular/core';
import {UedInputDirective} from "../directive/ued-input.directive";

@Component({
  selector: 'app-ued-input',
  templateUrl: './ued-input.component.html',
  styleUrls: ['./ued-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UedInputComponent implements OnInit,OnChanges,AfterContentInit {


  @ContentChild(UedInputDirective) _inputRef: UedInputDirective;
  //@ContentChild(ChildDirective) contentChild: ChildDirective;

  constructor() { }

  ngOnInit() {
    console.log('OnInit');
    console.log(this._inputRef);
  }
  ngAfterContentInit():void {
    console.log('AfterContentInit');
    console.log(this._inputRef);

    this._inputRef.stateChanges.subscribe(() => {
      console.log('AfterContentInit');
      console.log(this._inputRef);
      this.temp=this._inputRef.focused;
    });
  }

  temp:boolean=false;

  inputVal:string="";

  isInpEmpty:boolean=true;

  changeStatus(){
    this.temp=!this.temp;
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.isInpEmpty= this.inputVal=='';
  }

  ngDoCheck():void {

  }
}
