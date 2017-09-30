import { Injectable } from '@angular/core';

import { Category } from "../model/category-model"

const categoryList: Category[] = [
  //{id: 1, name: 'all',label:"全部"},
  {id: 2, name: 'vision',label:"视觉"},
  {id: 3, name: 'research',label:"用研"},
  {id: 4, name: 'interactive',label:"交互"},
  {id: 5, name: 'gis',label:"GIS"},
  {id: 6, name: 'rdk',label:"RDK"},
  {id: 7, name: 'front',label:"前端"},
  {id: 8, name: 'back',label:"后端"},
  {id: 9, name: 'activity',label:"活动"}
];

@Injectable()
export class PostCategoryService {

  constructor() { }

  getCategoryList():Category[]{
    return categoryList
  }
}


