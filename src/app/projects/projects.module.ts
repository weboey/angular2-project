import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from "./projects-routing.module";
import {MyTableCellOption, MyTableHeadOption, ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectService} from "./project-service/project.service";
import {FooterComponent} from "../home/footer/footer.component";
import {SlideImgComponent} from "../slide-img/slide-img.component";
import {AuthGuard} from "./auth-guard";
import {JigsawModule} from '@rdkmaster/jigsaw';
import {UedCommonModule} from "../common/ued-common.module";

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    JigsawModule,UedCommonModule
  ],
  declarations: [
    ProjectDetailComponent,
    ProjectListComponent,
    FooterComponent,
    SlideImgComponent,
    MyTableHeadOption,
    MyTableCellOption,
  ],
  entryComponents: [
    MyTableHeadOption,
    MyTableCellOption,
  ],
  providers:[ProjectService,AuthGuard],
})
export class ProjectModule { }
