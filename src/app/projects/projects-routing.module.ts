import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {AuthGuard} from "./auth-guard";
import {CanActivateGuard} from "../admin/can-acitvate.service";
const ProjectsRoutes: Routes = [
  {path: '', component: ProjectListComponent,canActivate: [CanActivateGuard]},
  {path: ':id', component: ProjectDetailComponent,canActivate: [CanActivateGuard]}
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
