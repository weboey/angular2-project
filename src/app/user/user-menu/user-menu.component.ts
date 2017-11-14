import { Component, OnInit ,Input} from '@angular/core';

import {UserLoginService} from "../../user/user-login/user-login.service";

import {Router} from "@angular/router";

@Component({
  selector: 'ued-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public currentUser: any;
  constructor(private userLoginService:UserLoginService,public router: Router) { }
  ngOnInit(){
    this.currentUser = this.userLoginService.currentUserGlobal;
    this.userLoginService.currentUser
      .subscribe(
        data=>{this.currentUser = data;},
        error => console.error(error)
      )
  }

  doOutLogin(){
    this.userLoginService.logout()
  }
  doUserCenter(navItem){

   // this.userCenterService.userCenterEvent.emit(navItem);
  }
}
