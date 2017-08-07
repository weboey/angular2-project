import {Component, Renderer2, ViewContainerRef,OnInit} from '@angular/core';
import {Home} from "./home/home";
import {User} from "./user/model/user-model";
import {UserLoginService} from "./user/user-login/user-login.service";

/* start */
/* end */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{
  title = 'big data ued';
  data: Home[][] = [[
    {id: 1,name:"用户管理", icon:"glyphicon glyphicon-picture"},
    {id: 2,name:"角色管理", icon:"glyphicon glyphicon-tint"},
  ],[
    {id: 1,name:"用户管理", icon:"glyphicon glyphicon-picture"},
    {id: 2,name:"角色管理", icon:"glyphicon glyphicon-tint"},
    {id: 3,name:"个人中心", icon:"glyphicon glyphicon-user"},
  ],[
    {id: 1,name:"用户管理", icon:"glyphicon glyphicon-picture"},
    {id: 2,name:"角色管理", icon:"glyphicon glyphicon-tint"},
    {id: 3,name:"个人中心", icon:"glyphicon glyphicon-user"},
    {id: 4,name:"登录用户", icon:"glyphicon glyphicon-log-in"},
  ]]

  public currentUser: User;
  constructor(private userLoginService:UserLoginService) { }
  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userLoginService.currentUser
      .subscribe(data=>{
          this.currentUser = data;
        },
        error => console.error(error)
      )

  }
}


