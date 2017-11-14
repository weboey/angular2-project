import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

/*路由模块 here*/
import {UserRoutingModule} from "./user-routing.module";

/*模块 第三方 here*/
import {UedCommonModule} from "../common/ued-common.module";
import {FileUploadModule} from 'primeng/primeng';
import {
  JigsawCheckBoxModule,
  JigsawRootModule,
  JigsawSelectModule,
  JigsawTabsModule,
  JigsawButtonModule,
  JigsawInputModule,
  JigsawCollapseModule
} from "@rdkmaster/jigsaw";

/*组件 here*/
import { UserInformationComponent } from './user-center/user-information/user-information.component';
import { UserPostComponent } from './user-center/user-post/user-post.component';
import { ModifyPasswordComponent } from './user-center/modify-password/modify-password.component';
import { HeadPictureUploadComponent } from './user-center/user-information/head-picture-upload/head-picture-upload.component';
import { UserComponent } from "./user.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserRegisterComponent } from "./user-register/user-register.component";
import { UserMainComponent } from "./user-main/user-main.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import { PermissionComponent } from "./permission/permission.component";

/*服务 here*/
import { UserCenterService } from "./user-center/service/user-center.service";
import { ProjectService } from "../projects/project-service/project.service";
import { ShowPipe } from "./permission/pipe/show.pipe";
import { UserPipe } from "./permission/pipe/user.pipe";

@NgModule({
  imports: [
    CommonModule,UserRoutingModule,
    FormsModule,ReactiveFormsModule,
    UedCommonModule,
    JigsawCheckBoxModule,
    JigsawSelectModule,
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawInputModule,
    JigsawCollapseModule,
    JigsawRootModule,
    FileUploadModule
  ],
  declarations: [
    UserInformationComponent,
    UserPostComponent,
    UserMainComponent,
    UserMenuComponent,
    ModifyPasswordComponent,
    HeadPictureUploadComponent,
    UserComponent,
    UserLoginComponent,
    UserRegisterComponent,
    PermissionComponent,
    ShowPipe,
    UserPipe
  ],
  providers: [ProjectService,UserCenterService],
  exports:[UserComponent,UserMainComponent]
})
export class UserModule { }
