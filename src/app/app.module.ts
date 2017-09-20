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

/* load service  start*/

/* load component  start*/
import { AppRoutingModule }     from './app-routing.module';
import { HomeComponent }  from './home/home.component';
import { LoginComponent } from './admin/login/login.component';

/* load module  start*/
import {ToolsModule} from "./tools/tools.module";
import {ComponentsModule} from "./components/components.module";
import { PostModule } from "./post/post.module";
import {ProjectModule} from "./projects/projects.module";
import {HelpDocModule} from "./help-doc/help-doc.module";
import {UserNavComponent} from "./home/user-nav/user-nav.component";
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import {UserLoginService} from "./user/user-login/user-login.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {EqualValidator} from "./user/user-register/directives/equal-validator.directive";
import { RippleDirective } from './animations/ripple.directive';

//import { FooterComponent } from './footer/footer.component';


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'app/i18n/', '.json');
}

@NgModule({
  declarations: [  //declarations数组包含应用中属于该模块的组件、管道和指令的列表
    AppComponent,
    UserNavComponent,
    HomeComponent,
    LoginComponent,
    UserLoginComponent,
    UserComponent,
    UserRegisterComponent,
    PageNotFoundComponent,EqualValidator, RippleDirective
    //FooterComponent
  ],
  imports: [
    BrowserModule,
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
    ToolsModule,
    ComponentsModule,
    ProjectModule,
    PostModule,
    HelpDocModule,
    AppRoutingModule
  ],
  providers: [UserLoginService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
