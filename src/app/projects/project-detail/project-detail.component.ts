
import { Component, OnInit } from '@angular/core';
import { ProjectService }         from "../project-service/project.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Project } from "../project";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectDetail: Project;
  constructor(
    private projectService:ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {debugger;return this.projectService.getProjectDetail(params["id"]);})
       .subscribe(projects =>{
          debugger;
          this.projectDetail = projects;
       })
    }
}

