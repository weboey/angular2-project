import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
/*路由模块 here*/
import {UserRoutingModule} from "./user-routing.module";
import {JigsawModule} from '@rdkmaster/jigsaw';
import {FileUploadModule} from 'primeng/primeng';
/*组件 here*/

/*服务 here*/
import {UserCenterService} from "./user-center/service/user-center.service";
import { UserInformationComponent } from './user-center/user-information/user-information.component';
import { UserPostComponent } from './user-center/user-post/user-post.component';
import { ModifyPasswordComponent } from './user-center/modify-password/modify-password.component';
import {UedCommonModule} from "../common/ued-common.module";
import { HeadPictureUploadComponent } from './user-center/user-information/head-picture-upload/head-picture-upload.component';
import {UserComponent} from "./user.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserMainComponent} from "./user-main/user-main.component";
import {UserMenuComponent} from "./user-menu/user-menu.component";

@NgModule({
  imports: [
    CommonModule,UserRoutingModule,
    FormsModule,ReactiveFormsModule,
    JigsawModule,
    UedCommonModule,
    FileUploadModule
  ],
  declarations: [UserInformationComponent,
    UserPostComponent,UserMainComponent, UserMenuComponent,
    ModifyPasswordComponent,
    HeadPictureUploadComponent,
    UserComponent,UserLoginComponent,UserRegisterComponent
  ],
  providers: [UserCenterService],
  exports:[UserComponent,UserMainComponent]

})
export class UserModule { }
