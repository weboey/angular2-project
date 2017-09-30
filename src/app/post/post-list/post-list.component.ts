import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';

import {Post} from "../model/post-model";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {PostlistService} from "./service/post-list.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public postList:Array<Post>;

  public searchTextStream:Subject<string> = new Subject<string>();

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public postService:PostlistService
              ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.loadData(params["name"]);
    });
  }

  public loadData(cateType:string){
    return this.postService.getPostList(cateType)
      .subscribe(
      res=>{
        this.postList = res;
      },
      error => {console.log(error)},
      () => {}
    );
  }
}
