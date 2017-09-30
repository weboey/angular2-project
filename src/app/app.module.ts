import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';

import {JigsawModule} from '@rdkmaster/jigsaw';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//
/* load service  start*/
import {GlobalService} from "./admin/global.service";
/* load component  start*/
import { AppRoutingModule }     from './app-routing.module';
import { HomeComponent }  from './home/home.component';


/* load module  start*/
import { ToolsModule } from "./tools/tools.module";
import { ComponentsModule } from "./components/components.module";
import { ProjectModule } from "./projects/projects.module";
import { HelpDocModule } from "./help-doc/help-doc.module";
import { PostModule } from "./post/post.module";
import { HomeModule } from "./home/home.module";
/* load module  end*/

// import { UserNavComponent } from "./home/user-nav/user-nav.component";

import { UserLoginService } from "./user/user-login/user-login.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PermissionComponent } from './permission/permission.component';
import { UserPipe } from './permission/pipe/user.pipe';
import { ShowPipe } from './permission/pipe/show.pipe';
import { GlobalSearchComponent } from './home/global-search/global-search.component';
import { SearchService } from "./home/global-search/search.service";

//import { FooterComponent } from './footer/footer.component';
import {GrowlModule} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import {CanDeactivateGuard} from "./admin/can-deactivate-guard.service";
import { UserCenterComponent } from './user/user-center/user-center.component';


import {UserModule} from "./user/user.module";
import {CanActivateGuard} from "./admin/can-acitvate.service";
import {UedCommonModule} from "./common/ued-common.module";
import {TeamModule} from "./team/team.module";


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'app/i18n/', '.json');
}

@NgModule({
  declarations: [  //declarations数组包含应用中属于该模块的组件、管道和指令的列表
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    PermissionComponent,
    UserPipe,
    ShowPipe,
    GlobalSearchComponent,
    UserCenterComponent
  ],
  imports: [
    BrowserModule,GrowlModule,HomeModule,UserModule,UedCommonModule,
    FormsModule,ReactiveFormsModule , //<-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    BrowserAnimationsModule,
    JigsawModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [Http]
        },
        isolate: true
      }
    ),
    ToolsModule,PostModule,
    ComponentsModule,
    ProjectModule,
    HelpDocModule,
    TeamModule,
    AppRoutingModule
  ],
  providers: [UserLoginService,SearchService,MessageService,CanDeactivateGuard,CanActivateGuard,GlobalService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
