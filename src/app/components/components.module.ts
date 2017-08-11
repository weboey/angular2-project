import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentRoutingModule} from "./components-routing.module";

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
import { JigsawMarkdownComponent } from './jigsaw-markdown/jigsaw-markdown.component';
import {SanitizeHtmlPipe} from "./component-detail/component-detail-content/component-detail-content.component";

@NgModule({
  imports: [
    CommonModule,
    ComponentRoutingModule
  ],
  providers:[ComponentMenuService],
  declarations: [
    ComponentMenuNavComponent,
    MenuFilterPipe,SanitizeHtmlPipe,
    ComponentDetailComponent,
    ComponentDetailNavComponent,
    ComponentDetailContentComponent,
    NormComponent,
    DemoComponent,
    ApiComponent,
    ComponentQuickstartComponent,
    JigsawMarkdownComponent
  ]
})
export class ComponentsModule { }
