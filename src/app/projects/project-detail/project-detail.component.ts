
import { Component, OnInit } from '@angular/core';
import { ProjectService }         from "../project-service/project.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Project } from "../project";
import { Doc} from "../doc";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectDetail:Project = new Project();
  projectDetailImgs:string[];
  projectDocsShow: boolean;
  numImgs: number;
  constructor(private projectService:ProjectService,
              private route:ActivatedRoute) {
  }
  ngOnInit(): void{
    this.route.params
      .switchMap((params: Params) => {return this.projectService.getProjectDetail(params["id"]);})
       .subscribe(projects =>{
         projects.CreatTime = projects.CreatTime.slice(0,10);
         projects.UpdateTime = projects.UpdateTime.slice(0,10);
         this.projectDetail = projects;console.log(this.projectDetail);
         this.projectDocsShow = !projects.RequirementDoc.length;
    })
    this.route.params
      .switchMap((params: Params) => {return this.projectService.getProjectDetailImgs(params["id"]);})
      .subscribe(projectImgs =>{
        this.numImgs = projectImgs.length;
        this.projectDetailImgs = projectImgs;
      })
  }
}
