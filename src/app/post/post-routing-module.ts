/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostCategoryComponent} from "./post-category/post-category.component";
import {PostListComponent} from "./post-list/post-list.component";
import {PostDetailMainComponent} from "./post-detail-main/post-detail-main.component";
import {WritePostComponent} from "./write-post/write-post.component";
import {CanDeactivateGuard} from "../admin/can-deactivate-guard.service";
import {CanActivateGuard} from "../admin/can-acitvate.service";

const PostRoutes: Routes = [
  {path:'', redirectTo: 'all', pathMatch:'full'},
  {
    path:':name',
    component:PostCategoryComponent,
    children:[
      {path:'', component:PostListComponent,},
      {path:'detail/:postId', component:PostDetailMainComponent,}
    ]
  },
  {path:'user/write', component:WritePostComponent,canActivate: [CanActivateGuard], canDeactivate: [CanDeactivateGuard]},
  {path:'user/write/:postId', component:WritePostComponent,canActivate: [CanActivateGuard],canDeactivate: [CanDeactivateGuard]}

];

@NgModule({
  imports: [
    RouterModule.forChild(PostRoutes)
  ],
  exports: [ RouterModule ]
})
export class PostRoutingModule { }
