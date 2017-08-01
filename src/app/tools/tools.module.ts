import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolsRoutingModule} from "./tools-routing.module";
import {ToolsService} from "./tools.service";
import {ToolListComponent} from "./tool-list/tool-list.component";
import {ToolDetailComponent} from "./tool-detail/tool-detail.component";


@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule
  ],
  providers:[ToolsService],
  declarations: [ToolListComponent,ToolDetailComponent]
})
export class ToolsModule { }
