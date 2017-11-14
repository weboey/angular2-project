import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule} from "./tools-routing.module";

import { UedCommonModule } from '../common/ued-common.module';
import { JigsawTooltipModule } from "@rdkmaster/jigsaw";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { ToolListComponent } from "./tool-list/tool-list.component";
import { ToolDetailComponent } from "./tool-detail/tool-detail.component";

import { ToolsService } from "./tools.service";

@NgModule({
  imports: [
    CommonModule,PerfectScrollbarModule,JigsawTooltipModule,
    ToolsRoutingModule,UedCommonModule
  ],
  providers:[ToolsService],
  declarations: [ToolListComponent,ToolDetailComponent]
})
export class ToolsModule { }
