import { Component, OnInit } from '@angular/core';
import {UserLoginService} from "../user-login/user-login.service";
import {User} from "../model/user-model";

@Component({
  selector: 'ued-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  constructor(private userLoginService:UserLoginService) { }
  currentUser:User;
  ngOnInit() {
    this.currentUser = this.userLoginService.currentUserGlobal;
    this.userLoginService.currentUser
      .subscribe(
        data => {
          this.currentUser = data;
        },
        error => console.error(error)
      )
  }

}
