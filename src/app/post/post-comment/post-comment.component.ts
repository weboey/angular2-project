import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {PostCommentService} from "./post-comment.service";
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  public comments: Array<Comment>;

  constructor(
    public commentService: PostCommentService,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => this.getCommentList(params["postId"])
    );
  }

  public getCommentList(postId: number){
    this.commentService.getCommentList(postId)
      .subscribe(
        data => {
          this.comments = data["items"]
        },
        error => console.error(error)
      );
  }
}
