import { Component, OnInit } from '@angular/core';
import {UserCenterService} from "../service/user-center.service";
import {User} from "../../model/user-model";
import {UserLoginService} from "../../user-login/user-login.service";
import { Router, ActivatedRoute} from '@angular/router';
import {JigsawWarningAlert} from "@rdkmaster/jigsaw";
@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {

  constructor(private userCenterService:UserCenterService,
              public userLoginService: UserLoginService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  userPostList:any[];
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

  doDeleteMyPost(event,delPost){
    event.stopPropagation();
    JigsawWarningAlert.show(' ', answer => {
      if(answer && answer.label=='删除'){
        this._deletePost(delPost);
      }
    },[{label: '取消'}, {label: '删除'}],"确认要删除此文章吗？删除后无法恢复!");
  }
  _deletePost(delPost){
    this.userCenterService.deleteMyPost(delPost.serialNum)
      .subscribe(
        data=>{
          this.reloadMyPostData();
        },
        err=>console.log("删除失败:"+err)
      )
  }

  getImg(url:string):string{
    if(url==null || url==""){
      return "assets/img/article.png"
    }
    return url
  }

  goToDetail(id:string){
    this.router.navigate(['/post/all/detail',id], { relativeTo: this.activeRoute });
  }
  goToEdit(id:string){
    this.router.navigate(['/post/user/write',id], { relativeTo: this.activeRoute });
  }
}
