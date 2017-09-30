import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import {GlobalService} from "../admin/global.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,OnDestroy {


  @Output() onLeaveHome = new EventEmitter();

  ngOnInit() {
    this.globalService.setHomePage(true);
  }
  constructor(private globalService:GlobalService) { }

  ngOnDestroy():void {
    this.globalService.setHomePage(false);
  }
}
