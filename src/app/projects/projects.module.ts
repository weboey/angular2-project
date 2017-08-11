import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from "./projects-routing.module";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectService} from "./project-service/project.service";
import {FooterComponent} from "../home/footer/footer.component";
import { KeywordPipe } from './pipe/keyword.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ],
  declarations: [
    ProjectDetailComponent,
    ProjectListComponent,
    FooterComponent,
    KeywordPipe,
  ],
  providers:[ProjectService],
})
export class ProjectModule { }
