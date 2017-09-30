import { Component, OnInit } from '@angular/core';
import {User} from "./model/user-model";

@Component({
  selector: 'ued-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public currentUser: User;
  constructor() { }
  isRegister:boolean;
  isLogin:boolean;
  user:{
    isLogin:boolean
  };
  ngOnInit() {
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
