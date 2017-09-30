import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {User} from "../../model/user-model";
import {UserLoginService} from "../../user-login/user-login.service";
import {UserCenterService} from "../service/user-center.service";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  sexEnum:Array<object>=[{label:'女',value:0},{label:'男',value:1}];
  vocationEnum:Array<object>=[
    {label:'前端开发'},
    {label:'后端开发'},
    {label:'视觉设计师'},
    {label:'交互设计师'},
    {label:'用户研究'},
    {label:'产品经理'}
  ];
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userLoginService: UserLoginService,
    private userCenterService:UserCenterService
  ) { }
  currentUser:User;
  selectedSex:any={};
  selectedVocation:any={};
  ngOnInit() {
    this.currentUser=this.userLoginService.currentUserGlobal;
    this.selectedSex=this.sexEnum[this.currentUser.sex];
    this.selectedVocation = this.vocationEnum.find((item)=>{
      return item['label']==this.currentUser['vocation'];
    });


  }
  onUserPictureUpload(event){
    this.currentUser['headPicture']=event.imgUrl;
  }
  doSaveUserInfo(){
    this.currentUser['vocation']=this.selectedVocation.label;
    this.userCenterService.updateCurrentUserInfo(this.currentUser)
      .subscribe(
        data =>{
          if(data.status==1){
            this.userCenterService.sendMsg('saveUserInfo');
            this.userLoginService.saveCurrentUser(this.currentUser);
          }
        },
        error=>{
          console.error("信息修改失败:",error) }
      );
  }
}
