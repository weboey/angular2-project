import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'app/i18n/', '.json');
}

@NgModule({
  declarations: [  //declarations数组包含应用中属于该模块的组件、管道和指令的列表
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //<-- import the FormsModule before binding with [(ngModel)]
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
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
