/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';

import {PostRoutingModule} from "./post-routing-module";
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDetailMainComponent } from './post-detail-main/post-detail-main.component';
import { PostCategoryComponent } from './post-category/post-category.component';

@NgModule({
  imports: [
    PostRoutingModule
  ],
  declarations: [PostListComponent, PostDetailComponent, PostDetailMainComponent, PostCategoryComponent]
})
export class PostModule { }
