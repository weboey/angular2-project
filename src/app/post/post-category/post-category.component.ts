import { Component, OnInit } from '@angular/core';
import {Category} from "../model/category-model";
import {PostCategoryService} from "./post-category.service";
import {flyIn} from "../../animations/fly-in";
import {fadeIn} from "../../animations/fade-in";
import {animateFactory} from "../../animations/animate-factory";

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
  animations:[animateFactory(500)]
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
