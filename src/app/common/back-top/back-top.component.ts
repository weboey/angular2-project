import {Component, Input, OnDestroy, OnInit, Renderer2,Inject,AfterViewInit} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.css']
})
export class BackTopComponent implements  OnDestroy,AfterViewInit {
  @Input() element: string;
  _documentListe:Function;
  showback:boolean = false;
  constructor(
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId : Object) { }

  getEle(){
    if (!isPlatformBrowser(this.platformId)) {
      return
    }
    let timer = null;
    let scrollEle = document.getElementsByClassName(this.element)[0];
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
      let oTop = scrollEle.scrollTop;
      let interval = oTop/5;
      if(oTop > 0){
        scrollEle.scrollTop = oTop - interval;
        timer = requestAnimationFrame(fn);
      }else{
        cancelAnimationFrame(timer);
      }
    });
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let ele = document.getElementsByClassName(this.element)[0];
      if(ele){
        this._documentListe=this._renderer.listen(ele, 'scroll', ()=>{
          this.showback = ele.scrollTop>50 ? true: false;
        });
      }
    }
  }
  ngOnDestroy(){
    this._documentListe && this._documentListe();
  }
}
