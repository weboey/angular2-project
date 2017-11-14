import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostAttach } from "../model/post-model";
import { PostlistService } from "../post-list/service/post-list.service";
@Component({
  selector: 'app-post-detail-attach',
  templateUrl: './post-detail-attach.component.html',
  styleUrls: ['./post-detail-attach.component.scss']
})
export class PostDetailAttachComponent implements OnInit {

  postAttachList:PostAttach[]=[];

  constructor(
    public activeRoute: ActivatedRoute,
    public postService:PostlistService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.getPostAttachList(params["postId"]);
    });
  }

  getPostAttachList(postId:string){
    return this.postService.getPostAttachList(postId)
      .subscribe(
        res=>{
          this.postAttachList = res;
        },
        error => {console.log(error)}
      );
  }
}
