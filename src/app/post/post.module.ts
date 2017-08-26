/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //指令
import {PostRoutingModule} from "./post-routing-module";
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDetailMainComponent } from './post-detail-main/post-detail-main.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostCategoryService } from "./post-category/post-category.service";
import { PostBrowserUserComponent } from './post-browser-user/post-browser-user.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import {PostCommentService} from "./post-comment/post-comment.service";
import {PostlistService} from "./post-list/service/post-list.service";

@NgModule({
  imports: [
    PostRoutingModule,CommonModule
  ],
  declarations: [PostListComponent, PostDetailComponent, PostDetailMainComponent, PostCategoryComponent, PostBrowserUserComponent, PostCommentComponent],
  providers: [PostCategoryService,PostCommentService,PostlistService],
})
export class PostModule { }
