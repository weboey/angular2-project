import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';

import {Post} from "../model/post-model";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {PostlistService} from "./service/post-list.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public postList:Array<Post>;
  public searchText:string;
  public searchTextStream:Subject<string> = new Subject<string>();

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public postService:PostlistService
              ) { }

  ngOnInit() {
    //从路由里面获取URL参数
    this.activeRoute.params.subscribe(params => {
      console.log(params);
     // this.currentPage=params.page;
      this.loadData(this.searchText);
    });
  }

  public loadData(searchText:string){
    return this.postService.getPostList(searchText).subscribe(
      res=>{
        this.postList = res["items"];
      },
      error => {console.log(error)},
      () => {}
    );
  }
}
