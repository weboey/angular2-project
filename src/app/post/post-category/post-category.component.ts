import { Component, OnInit } from '@angular/core';
import {Category} from "../model/category-model";
import {PostCategoryService} from "./post-category.service";
import {zoom} from "../../animations/zoom";
import {fade} from "../../animations/fade";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import { PLATFORM_ID ,Inject} from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
  animations:[zoom,fade]
})
export class PostCategoryComponent implements OnInit {
  isBrowser:boolean=true;
  categoryList:Category[];
  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: false,
    suppressScrollY: false
  };
  constructor(
    private postCategoryService:PostCategoryService,
    @Inject(PLATFORM_ID) private platformId : Object
  ) { }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.isBrowser=false;
    }
    this.loadCategoryData();
  }

  loadCategoryData(){
    this.categoryList = this.postCategoryService.getCategoryList();
  }
}
