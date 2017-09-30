import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {Post} from "../model/post-model";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {PostlistService} from "../post-list/service/post-list.service";

@Component({
  selector: 'app-post-recommend-list',
  templateUrl: './post-recommend-list.component.html',
  styleUrls: ['./post-recommend-list.component.css']
})
export class PostRecommendListComponent implements OnInit {

  postRecommendList:Array<Post>;

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public postService:PostlistService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    return this.postService.getPostList("all")
      .subscribe(
        res=>{
          this.postRecommendList = res.slice(0,8);
        },
        error => {console.log(error)},
        () => {}
      );
  }
}
