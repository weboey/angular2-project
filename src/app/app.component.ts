import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {Home} from "./home/home";

/* start */
/* end */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
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

}


