import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import {GlobalService} from "../admin/global.service";
import {fade} from "../animations/fade";
import {Message} from 'primeng/components/common/api';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[fade],
})
export class HomeComponent implements OnInit,OnDestroy {

  msgs: Message[] = [];
  @Output() onLeaveHome = new EventEmitter();

  ngOnInit() {
    this.globalService.setHomePage(true);
  }
  constructor(private globalService:GlobalService) { }

  ngOnDestroy():void {
    this.globalService.setHomePage(false);
  }

}
