import { Component, OnInit } from '@angular/core';
import { Project } from "../project";
import { ProjectService } from "../project-service/project.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projectLists: Project[];
  fang: boolean = true;
  keyWorkName: string;
  constructor(
    private projectService:ProjectService) {

  };
  keyWord(keyWorkName: string){
    this.keyWorkName = keyWorkName;
    this.projectService.getProjectListTarget(this.keyWorkName)
      .subscribe(projects =>{this.projectLists = projects;})
  }
  projectsFilter( liang: boolean ) {
    if(!liang){
      this.fang=!this.fang;
    }
  }
  ngOnInit() { //return JSON.parse(
    this.projectService.getProjectList()
    .subscribe(projects =>{this.projectLists = projects })
  }

}
