import { Component, OnInit,OnDestroy,AfterViewInit,Output,Input,ElementRef ,Renderer2,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {PostCommentService} from "../post-comment.service";
import {PostComment} from "../../model/comment-model";
import * as moment from "moment";
import {fade} from "../../../animations/fade";
@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
  host: {
    "(click)": "toggleClick($event)",
  },
  animations:[fade]
})
export class WriteCommentComponent implements OnInit,AfterViewInit, OnDestroy {


  @Output() onSubmitComment = new EventEmitter();
  @Output() onWriteCommentClose = new EventEmitter();

  @Input()
  public replyComment:PostComment;

  commentTip:string="";

  comment:PostComment = new PostComment();

  public currentUser:any;

  public postId:string;

  private _documentListen: Function; // document事件解绑函数


  constructor(
    public commentService: PostCommentService,
    public activeRoute: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {this.postId = params["postId"]}
    );
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(this.replyComment){
      this.commentTip=`@${this.replyComment.userName}`;
    }
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      let textEl:HTMLTextAreaElement = this.el.nativeElement.querySelector("form .comment-text");
      textEl.focus();
      let scrollBox = document.querySelector(".m-category .g-content-box");
      scrollBox.scrollTop=9999;
    },0);
    this._documentListen = this.renderer.listen('document', 'click',
      () => {this.onWriteCommentClose.emit()});
  }

  doCommit(commentForm:HTMLFormElement){
    this.comment.time=moment().format('YYYY-MM-DD HH:mm');
    this.comment.serialNum=this.postId;
    this.comment.uId=this.currentUser.uid;
    this.comment.userName=this.currentUser.userName;
    if(this.replyComment){ //回复已有评论
      this.comment.replyId=this.replyComment.commentId;
      this.comment.replyName=this.replyComment.userName;
    }
    this.commentService.submitComment(this.comment)
      .subscribe(
        data =>{
          console.log(data,"评论成功");
          commentForm.reset();
          this.onSubmitComment.emit()
        },
        error=>{//todo
          console.error("评论失败:",error) }
      );
  }

  //点击组件，显示\隐藏option列表
  private toggleClick(event: Event): void {
   // event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy() {
    this._documentListen && this._documentListen();//解绑document上的点击事件
  }
}
