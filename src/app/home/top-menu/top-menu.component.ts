import { Component, OnInit } from '@angular/core';
import {UserLoginService} from "../../user/user-login/user-login.service";

@Component({
  selector: 'ued-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  currentUser:any;
  constructor(private userLoginService:UserLoginService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userLoginService.currentUser
      .subscribe(
        data => {
          this.currentUser = data;
        },
        error => console.error(error)
      )
  }

}
