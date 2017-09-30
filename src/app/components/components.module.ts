import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentRoutingModule} from "./components-routing.module";
import { FormsModule }   from '@angular/forms';
import {ComponentMenuNavComponent} from "./component-menu-nav/component-menu-nav.component";

import {ComponentDetailComponent} from "./component-detail/component-detail.component";
import { MenuFilterPipe } from './component-menu-nav/pipe/menu-filter.pipe';
import { ComponentDetailNavComponent } from './component-detail/component-detail-nav/component-detail-nav.component';
import { ComponentDetailContentComponent } from './component-detail/component-detail-content/component-detail-content.component';
import {ComponentMenuService} from "./service/component.service";
import { NormComponent } from './component-detail/component-detail-content/norm/norm.component';
import { DemoComponent } from './component-detail/component-detail-content/demo/demo.component';
import { ApiComponent } from './component-detail/component-detail-content/api/api.component';
import { ComponentQuickstartComponent } from './component-quickstart/component-quickstart.component';
import {SanitizeHtmlPipe} from "./component-detail/component-detail-content/component-detail-content.component";
import {SanitizeResourceUrLPipe} from "./component-detail/component-detail-content/component-detail-content.component";

import { UedCommonModule } from "../common/ued-common.module";
import { ApiListComponent } from './component-detail/component-detail-content/api-list/api-list.component'
import {ApiListService} from "./component-detail/component-detail-content/api-list/service/post-list.service";
@NgModule({
  imports: [
    CommonModule,UedCommonModule,
    ComponentRoutingModule,FormsModule
  ],
  providers:[ComponentMenuService,ApiListService],
  declarations: [
    ComponentMenuNavComponent,
    MenuFilterPipe,SanitizeHtmlPipe,SanitizeResourceUrLPipe,
    ComponentDetailComponent,
    ComponentDetailNavComponent,
    ComponentDetailContentComponent,
    NormComponent,
    DemoComponent,
    ApiComponent,
    ComponentQuickstartComponent,
    ApiListComponent,
  ]
})
export class ComponentsModule { }
