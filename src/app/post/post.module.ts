/**
 * Created by Administrator on 2017/8/23.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //指令
import { FormsModule }   from '@angular/forms';

//路由
import { PostRoutingModule} from "./post-routing-module";

//模块
import { JigsawAlertModule, JigsawButtonModule, JigsawSelectModule} from "@rdkmaster/jigsaw";
import { FileUploadModule} from 'primeng/primeng';
import { ProgressBarModule} from 'primeng/primeng';
import { GrowlModule} from 'primeng/primeng';
import { PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { UedCommonModule } from '../common/ued-common.module';
import { HomeModule} from "../home/home.module";

//组件
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDetailAttachComponent } from "./post-detail-attach/post-detail-attach.component";
import { PostDetailMainComponent } from './post-detail-main/post-detail-main.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostBrowserUserComponent } from './post-browser-user/post-browser-user.component';
import { PostRecommendListComponent } from './post-recommend-list/post-recommend-list.component';
import { WriteCommentComponent } from './post-comment/write-comment/write-comment.component';
import { WritePostComponent } from './write-post/write-post.component';

//服务
import { PostCategoryService } from "./post-category/post-category.service";
import { PostCommentService } from "./post-comment/post-comment.service";
import { PostlistService } from "./post-list/service/post-list.service";
import { WritePostService} from "./write-post/service/write-post.service";
import { CommentFilterPipe } from "./post-comment/pipe/comment-filter.pipe";

@NgModule({
  imports: [
    PostRoutingModule,CommonModule,UedCommonModule,FormsModule,PerfectScrollbarModule,
    FileUploadModule,ProgressBarModule,GrowlModule,HomeModule,
    JigsawAlertModule, JigsawButtonModule, JigsawSelectModule
  ],
  declarations: [
    PostListComponent,
    PostDetailComponent,
    PostDetailAttachComponent,
    PostDetailMainComponent,
    PostCategoryComponent,
    PostBrowserUserComponent,
    PostCommentComponent,
    PostRecommendListComponent,
    WriteCommentComponent,
    CommentFilterPipe,
    WritePostComponent,
  ],
  providers: [PostCategoryService,PostCommentService,PostlistService,WritePostService],
})
export class PostModule { }
