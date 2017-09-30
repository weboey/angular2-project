import { Component, OnInit } from '@angular/core';
import {UserCenterService} from "../service/user-center.service";
import {Post} from "../../../post/model/post-model";
import {User} from "../../model/user-model";
import {UserLoginService} from "../../user-login/user-login.service";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {

  constructor(private userCenterService:UserCenterService,
              public userLoginService: UserLoginService) { }

  userPostList:Post[];
  currentUser:User;
  ngOnInit() {
    this.reloadMyPostData();
  }

  reloadMyPostData(){
    this.currentUser=this.userLoginService.currentUserGlobal;
    this.userCenterService.getMyPostData(''+this.currentUser.uid)
      .subscribe(
        data=>{console.log(data);this.userPostList=data},
        err=>console.log("获取我的博文失败:"+err)
      )
  }

  doDeleteMyPost(delPost:Post){
    this.userCenterService.deleteMyPost(delPost.serialNum)
      .subscribe(
        data=>{
          console.log(data);
          this.reloadMyPostData();
          this.userCenterService.sendMsg('remove');
        },
        err=>console.log("删除失败:"+err)
      )
  }
}
