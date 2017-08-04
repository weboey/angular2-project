import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {User} from "../model/user-model";
import { fadeIn } from '../../animations/fade-in';
import { Headers, Http } from '@angular/http';
@Component({
  selector: 'ued-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  animations: [ fadeIn ]
})
export class UserLoginComponent implements OnInit {

  @Output() onRegister = new EventEmitter();
  public user:User = new User();
  public error : Error;


  constructor(private http: Http) { }

  ngOnInit() {

  }
  doLogin(){
    console.log(this.user);
   // this.userLoginService.login(this.user);
   // this.http.get("http://10.9.233.35:80/")
    this.http.get("rdk/service/app/ued/server/my_service")
      .subscribe(response=>console.log(response));
    this.http.get("/xplan/project/latestCreatedProjectList?begin=0&pageSize=30&order=")
      .subscribe(response=>console.log(response));
  }
  registerUser(){
    this.onRegister.emit();
  }
}
