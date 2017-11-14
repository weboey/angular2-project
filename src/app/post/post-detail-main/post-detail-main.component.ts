import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Post } from '../model/post-model';
import { PostlistService } from "../post-list/service/post-list.service";

@Component({
  selector: 'app-post-detail-main',
  templateUrl: './post-detail-main.component.html',
  styleUrls: ['./post-detail-main.component.scss']
})
export class PostDetailMainComponent implements OnInit {

  post:Post;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public postService:PostlistService
  ) { }

  ngOnInit() {
    //从路由里面获取URL参数
    this.activeRoute.params.subscribe(params => {
      this.getPostDetial(params["postId"]);
    });
  }

  getPostDetial(postId:string){
    return this.postService.getPostDetial(postId)
      .subscribe(
        res=>{
          this.post = res;
        },
        error => {console.log(error)},
        () => {}
      );
  }

}
