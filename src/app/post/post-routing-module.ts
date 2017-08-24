/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostCategoryComponent} from "./post-category/post-category.component";
import {PostListComponent} from "./post-list/post-list.component";
import {PostDetailMainComponent} from "./post-detail-main/post-detail-main.component";

const PostRoutes: Routes = [
  {
    path: 'post',
    children:[
      {
        path:'',
        redirectTo:'all',
        pathMatch:'full'
      },
      {
        path:':name',
        component:PostCategoryComponent,
        children:[
          {
            path:'',
            component:PostListComponent,
          },
          {
            path:'detail',
            component:PostDetailMainComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(PostRoutes)
  ],
  exports: [ RouterModule ]
})
export class PostRoutingModule { }
