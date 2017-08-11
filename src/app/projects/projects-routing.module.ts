import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
const ProjectsRoutes: Routes = [
  {
    path: 'projects',
    children: [
      {path: '', component: ProjectListComponent},
      {path: ':id', component: ProjectDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ProjectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectsRoutingModule { }
