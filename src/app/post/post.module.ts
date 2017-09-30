/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //指令
import { FormsModule }   from '@angular/forms';
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
import { PostRecommendListComponent } from './post-recommend-list/post-recommend-list.component';
import { UedCommonModule } from '../common/ued-common.module';
import { WriteCommentComponent } from './post-comment/write-comment/write-comment.component';
import {CommentFilterPipe} from "./post-comment/pipe/comment-filter.pipe";
import { WritePostComponent } from './write-post/write-post.component';
import { PostAuthorComponent } from './post-author/post-author.component';
import {JigsawModule} from '@rdkmaster/jigsaw';
import {FileUploadModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {WritePostService} from "./write-post/service/write-post.service";
import {GrowlModule} from 'primeng/primeng';
@NgModule({
  imports: [
    PostRoutingModule,CommonModule,UedCommonModule,FormsModule,JigsawModule,
    FileUploadModule,ProgressBarModule,GrowlModule
  ],
  declarations: [
    PostListComponent,
    PostDetailComponent,
    PostDetailMainComponent,
    PostCategoryComponent,
    PostBrowserUserComponent,
    PostCommentComponent,
    PostRecommendListComponent,
    WriteCommentComponent,
    CommentFilterPipe,
    WritePostComponent,
    PostAuthorComponent],
  providers: [PostCategoryService,PostCommentService,PostlistService,WritePostService],
})
export class PostModule { }
