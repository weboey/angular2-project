/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const PostRoutes: Routes = [
  {
    path:'',
    redirectTo:'page/1',
    pathMatch:'full'
  },
  {
    path:'page/:page',
    component:PostlistComponent
  },
  {
    path: 'postdetail/:postId',
    component: PostDetailMainComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(PostRoutes)
  ],
  exports: []
})
export class PostRoutingModule { }
