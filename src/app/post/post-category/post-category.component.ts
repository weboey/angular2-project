import { Component, OnInit } from '@angular/core';
import {Category} from "../model/category-model";
import {PostCategoryService} from "./post-category.service";

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

  categoryList:Category[];

  constructor(
    private postCategoryService:PostCategoryService
  ) { }

  ngOnInit() {
    this.loadCategoryData();
  }

  loadCategoryData(){
    this.categoryList = this.postCategoryService.getCategoryList();
  }
}
