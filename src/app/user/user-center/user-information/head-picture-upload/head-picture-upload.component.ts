import { Component, OnInit,HostBinding, HostListener,ViewEncapsulation,Input,Output,EventEmitter } from '@angular/core';
import {User} from "../../../model/user-model";

@Component({
  selector: 'ued-head-picture-upload',
  templateUrl: './head-picture-upload.component.html',
  styleUrls: ['./head-picture-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeadPictureUploadComponent implements OnInit {

  constructor() { }

  toggleShow:boolean=false;

  @Input() user:User;

  @Output() userPictureUpload = new EventEmitter();

  imgUploadUrl:string;

  ngOnInit() {
    this.imgUploadUrl=this.transform(''+this.user.uid,2)
  }

  @HostListener('mouseenter',['$event'])
  toggleImgUpload(event){
    this.toggleShow=true;
  }

  @HostListener('mouseleave',['$event'])
  toggleImgShow(event){
    if(this.imgStartUpload){
      return
    }
    this.toggleShow=false;
  }
  imgStartUpload:boolean=false;
  /*
   * 图片上传前的回调！
   * */
  onPhotoBeforeUpload():void{
    this.imgStartUpload=true;
  }

  /*
   * 图片上传成功后的回调！
   * */
  onPhotoUpload(event):void{
    this.imgUploadUrl =event.xhr.response;
    this.imgStartUpload=false;
    this.toggleShow=false;
    this.userPictureUpload.emit({imgUrl:this.imgUploadUrl});
  }

  transform(uid:string,size?:number){
    if(!uid) return;
    if(this.user['headPicture']!=null && this.user['headPicture']!=''){
      return this.user['headPicture']
    }
    return `http://zmail.zte.com.cn/Mapi/image/head/m${size || 1}/${uid.toString().substr(-3, 3)}/u${uid}.jpg`;
  }
}
