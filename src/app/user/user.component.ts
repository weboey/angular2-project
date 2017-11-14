import { Component, OnInit } from '@angular/core';
import {User} from "./model/user-model";
import {UserLoginService} from "./user-login/user-login.service";

@Component({
  selector: 'ued-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public currentUser: User;
  constructor(private userLoginService:UserLoginService) {

}
  isRegister:boolean;
  isLogin:boolean;
  user:{
    isLogin:boolean
  };
  ngOnInit(){
    this.userLoginService.openLoginProp$.subscribe(isLogin=>this.isLogin=isLogin)
  }
  onRegister(){
    this.isRegister=true;
    this.isLogin=!this.isRegister;
  }
  onCancel(){
    this.isRegister=false;
  }
  login(){
    this.isLogin=!this.isLogin;
    this.isRegister=false;
  }
}
