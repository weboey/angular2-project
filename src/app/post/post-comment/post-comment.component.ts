import { Component, OnInit ,ViewContainerRef,ElementRef} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {PostCommentService} from "./post-comment.service";
import {PostComment} from "../model/comment-model";
import * as moment from "moment";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  public comments: Array<PostComment>;

  public comment = new PostComment();
  public replyComment:PostComment;
  public currentComment:PostComment;

  public postId:string;

  public commentTip:string="你想说点什么...";

  public btnLabel:string="评论";

  public showCommentForm:boolean=false;

  public currentUser:any;
  constructor(
    public commentService: PostCommentService,
    public activeRoute: ActivatedRoute,
    private viewContainer: ViewContainerRef,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {this.postId = params["postId"];return this.getCommentList(+this.postId)}
    );

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  public getCommentList(postId: number){
    this.commentService.getCommentList(postId)
      .subscribe(
        data => {
          console.log(data);
          this.comments = data
        },
        error => console.error(error)
      );
  }
  doReply(comment:PostComment,commentReply?:PostComment){
    //const textEl:HTMLTextAreaElement = this.el.nativeElement.querySelector("form .form-control");
   // this.comment.content=`@${comment.userName}`;
    //textEl.focus();
    let event=window.event;
    event.preventDefault();
    event.stopPropagation();
    this.currentComment=comment;
    this.replyComment = commentReply || comment;
    this.replyComment.commentId=comment.commentId;
  }

  doRemove(comment:PostComment){
    this.commentService.deleteComment(comment.commentId)
      .subscribe(
        data =>{
          console.log(data,"删除评论成功");
          this.getCommentList(+this.postId);
        },
        error=>{//todo
          console.error("删除评论失败:",error) }
      );
  }

  doOpenCommentForm(){
    this.showCommentForm=true;
    this.commentTip="";

  }


  onCommentSucceed(){
    this.getCommentList(+this.postId)
  }

  onWriteCommentClose(){
    this.showCommentForm=false;
    this.currentComment=null;
    this.commentTip="你想说点什么...";
  }
}
