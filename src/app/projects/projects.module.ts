import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*路由&守卫*/
import { ProjectsRoutingModule } from "./projects-routing.module";
import { AuthGuard} from "./auth-guard";

/*模块*/
import { UedCommonModule } from "../common/ued-common.module";
import { HomeModule } from "../home/home.module";
import {
  JigsawButtonModule,JigsawInputModule,JigsawTagModule,JigsawTableModule
} from "@rdkmaster/jigsaw";
/*组件*/
import { MyTableCellOption, MyTableHeadOption, ProjectDetailComponent} from "./project-detail/project-detail.component";
import { ProjectListComponent} from "./project-list/project-list.component";
import { ProjectService} from "./project-service/project.service";
import { FooterComponent} from "../home/footer/footer.component";



@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    JigsawButtonModule,
    JigsawInputModule,
    JigsawTagModule,
    JigsawTableModule,
    UedCommonModule,
    HomeModule
  ],
  declarations: [
    ProjectDetailComponent,
    ProjectListComponent,
    FooterComponent,
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
