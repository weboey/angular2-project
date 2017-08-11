import { Component, OnInit ,Input} from '@angular/core';
import { Home } from "../home";
import {UserLoginService} from "../../user/user-login/user-login.service";
import {User} from "../../user/model/user-model";

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  @Input()
  navLists : Home[];

  public currentUser: User;
  constructor(private userLoginService:UserLoginService) { }
  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userLoginService.currentUser
      .subscribe(
        data=>{this.currentUser = data;},
        error => console.error(error)
      )
  }
  doUserCenter(navItem){
    if(navItem.name="登出账户"){
      this.userLoginService.logout()
    }
    //if(navItem.name="用户管理"){
    //
    //}
    //if(navItem.name="角色管理"){
    //
    //}
    //if(navItem.name="个人中心"){
    //
    //}
   // this.userCenterService.userCenterEvent.emit(navItem);
  }

}
