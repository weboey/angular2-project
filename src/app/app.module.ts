import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/*路由&守卫*/
import { AppRoutingModule }     from './app-routing.module';
import { CanActivateGuard} from "./admin/can-acitvate.service";
import { CanDeactivateGuard } from "./admin/can-deactivate-guard.service";
/*模块*/
import { HomeModule } from "./home/home.module";
import { UserModule } from "./user/user.module";
import { UedCommonModule } from "./common/ued-common.module";
/*模块 第三方*/
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { JigsawRootModule }  from "@rdkmaster/jigsaw";
import { GrowlModule} from 'primeng/primeng';
/*组件*/
import { AppComponent } from './app.component';
import { HomeComponent }  from './home/home.component';
import { UserCenterComponent } from './user/user-center/user-center.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
/*服务*/
import { GlobalService} from "./admin/global.service";
import { UserLoginService } from "./user/user-login/user-login.service";
import { SearchService } from "./home/global-search/search.service";
import { MessageService} from 'primeng/components/common/messageservice';

import { Message} from 'primeng/primeng';

@NgModule({
  declarations: [  //declarations数组包含应用中属于该模块的组件、管道和指令的列表
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    UserCenterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'zte-ued'}),
    GrowlModule,
    HomeModule,
    UserModule,
    UedCommonModule,PerfectScrollbarModule,
    FormsModule,ReactiveFormsModule , //<-- import the FormsModule before binding with [(ngModel)]
    HttpModule,JigsawRootModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    UserLoginService,
    SearchService,
    MessageService,
    CanDeactivateGuard,
    CanActivateGuard,
    GlobalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
