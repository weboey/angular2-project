import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';

import {Post} from "../model/post-model";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public postList:Array<Post>;

  constructor(public router: Router,
              public activeRoute: ActivatedRoute
              ) { }

  ngOnInit() {
    //从路由里面获取URL参数
    this.activeRoute.params.subscribe(params => {
      console.log(params);
     // this.currentPage=params.page;
     // this.loadData(this.searchText);
    });
  }

  public loadData(searchText:string){

  }
}
