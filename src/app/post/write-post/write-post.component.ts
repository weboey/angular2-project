import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params ,RouterState,RouterStateSnapshot} from '@angular/router';
import { Category } from "../model/category-model";
import { PostCategoryService } from "../post-category/post-category.service";
import { WritePostService } from "./service/write-post.service";
import { Observable } from 'rxjs/Rx';
import { Post } from "../model/post-model";
import * as moment from "moment";
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {PostlistService} from "../post-list/service/post-list.service";

enum EPostStatus {NEW,EDIT}

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.scss']
})
export class WritePostComponent implements OnInit {

  categoryList:Category[];
  selectedType:any={};
  imgProgVal:number=0;
  attProgVal:number=0;
  imgUploadStatus:boolean=false;
  attUploadStatus:boolean=false;
  imgUploadUrl:string="";
  attachmentFiles: any[] = [];

  post:Post=new Post();
  public currentUser:any;
  msgs: Message[] = [];

  status:EPostStatus=EPostStatus.NEW;

  constructor(
    private postCategoryService:PostCategoryService,
    private writePostService:WritePostService,
    private postService:PostlistService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const state: RouterState = this.router.routerState;
    this.activeRoute.params.subscribe(params => {
      //继续编辑
      !!params["postId"] && this.getPostDetial(params["postId"]);
    });
    this.loadCategoryData();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  getPostDetial(postId:string){
    return this.postService.getPostDetial(postId)
      .subscribe(
        res=>{
          this.post = res;
          this.selectedType={label:this.post.type};
          console.log(this.selectedType);
          this.imgUploadUrl=this.post.headPicture;
          this.status=EPostStatus.EDIT;
        },
        error => {console.log(error)},
        () => {}
      );
  }

  loadCategoryData(){
    this.categoryList = this.postCategoryService.getCategoryList();
  }
  /*
   * 图片上传前的回调！
   * */
  onPhotoBeforeUpload():void{
    this.imgUploadStatus=true;
  }
  onAttBeforeUpload():void{
    this.attUploadStatus=true;
  }
  /*
   * 图片上传中...！
   * */
  onPhotoProgress(event):void{
    this.imgProgVal=event.progress;
  }
  onAttProgress(event):void{
    this.attProgVal=event.progress;
  }
  /*
  * 图片上传成功后的回调！
  * */
  onPhotoUpload(event):void{
    //this.demo.photo = JSON.parse(event.xhr.response).data.name;
    this.imgUploadUrl =event.xhr.response;
    //let chosseBtn = document.querySelector(".file-upload-box .ui-fileupload-choose");
    let contentElRef = document.querySelector(".file-upload-box .img-upload .ui-fileupload-content");
    //chosseBtn['style']['display']="none";
    contentElRef['style']['height']="auto";
    setTimeout(()=>{
      if(this.imgProgVal==100){
        this.imgUploadStatus=false;
        this.imgProgVal=0
      }
    },1000)
  }

  doRemovePhoto(){
    this.imgUploadUrl="";
    //let chosseBtn = document.querySelector(".file-upload-box .ui-fileupload-choose");
    //chosseBtn['style']['display']="";
    let contentElRef = document.querySelector(".file-upload-box .img-upload .ui-fileupload-content");
    //chosseBtn['style']['display']="none";
    contentElRef['style']['height']="320px";
  }

  onAttachmentUpload(event){
    for(let file of event.files) {
      this.attachmentFiles.push(file);
    }
    setTimeout(()=>{
      if(this.attProgVal==100){
        this.attUploadStatus=false;
        this.attProgVal=0
      }
    },1000)
  }
  removeAttFile(fileIndex){
    this.attachmentFiles.splice(fileIndex,1)
  }
  getContent($event){
    console.log($event);
    this.post.content=$event.content;
    //subTitle:this.smd.value().replace(/#|(\s)/g,'').slice(0,60),
  }
  //发布
  onSave() {
    this.post.status='1';
    this._commitPost();
  }
  //保存草稿
  onSaveDraft(){
    this.post.status='0';
    this._commitPost();
  }
  _commitPost(){

    this.post.author=this.currentUser.userName;
    this.post.uid=this.currentUser.uid;
    this.post.createdate=moment().format('YYYY-MM-DD HH:mm');
    this.post.updatedate=moment().format('YYYY-MM-DD HH:mm');
    this.post.subTitle=this.post.content && this.post.content.replace(/#|(\s)/g,'').slice(0,60);
    this.post.type=this.selectedType.label;
    this.post.headPicture=this.imgUploadUrl;
    this.post.attachment="";
    let msg:string='';
    if(this.post.status=='0'){
      msg="保存成功!"
    }else{
      msg="发布成功!"
    }
    this.writePostService.commitWritePost(this.post)
      .subscribe(
        data =>{
          if(data.status==1){
            this.msgs = [];
            this.msgs.push({severity:'success', summary:msg, detail:'1s后跳转到详情页'});
            setTimeout(()=>{
              this.router.navigate(["/post/all/detail/",data.articleId || this.post['articleId']], { relativeTo: this.activeRoute });
              this.ignoreCanDeactive=true; //发布成功跳转时忽略canDeactive守卫
            },1000)
          }
        },
        error=>{//todo
          console.error("博文保存失败:",error) }
      );
  }

  disableSave():boolean{
    return this.post.content=="" || this.post.title=="" || !this.selectedType.label
  }
  disableSaveDraft():boolean{
    return !this.post.title
  }

  ignoreCanDeactive:boolean=false; //发布成功跳转时忽略canDeactive守卫
  //退出编辑博文
  canDeactivate(): Promise<boolean> | boolean {
    if(this.ignoreCanDeactive){
      return true
    }
    if (!this.post.title && !this.post.content) {
      return true;
    }
    return this.confirm("确定要离开？");
  }
  confirm(message?: string) {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm(message || 'Is it OK?'));
    });
  };
  reBack(){
    this.gotoPostList();
  }
  gotoPostList() {
    history.back(); //history.go(-1)  location.reload()
    //this.router.navigate(['../../all'], { relativeTo: this.activeRoute });
  }
}
