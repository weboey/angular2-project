import { Component, OnInit, Renderer2 } from '@angular/core';
import {Http} from "@angular/http";
import {UserCenterService} from "./service/user-center.service";

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.scss']
})
export class UserCenterComponent implements OnInit {

  constructor(
    public renderer: Renderer2,
    public http: Http,
    private userCenterService:UserCenterService)
  {

  }
  msgs: Message[] = [];

  ngOnInit() {
    this.userCenterService.getMsg()
      .subscribe((msgs:Message[])=>this.msgs=msgs)
  }

}


