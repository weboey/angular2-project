/**
 * Created by 6176000041 on 2017/7/28.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Project } from "../project";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class ProjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectListUrl = 'rdk/service/app/ued/server/latestCreatedProjectList';  // URL to web api
  private projectListTargetUrl = 'rdk/service/app/ued/server/latestCreatedProjectTargets';  // URL to web api
  private projectListImgUrl = 'rdk/service/app/ued/server/latestCreatedProjectDetailImgs';  // URL to web api

  constructor(private http: Http) { }

  getProjectList(): Observable<Project[]> {
    return this.http.get(`${this.projectListUrl}`)
      .map(response => JSON.parse(response["_body"]).data)
  }
  getProjectListTarget(target: string): Observable<Project[]> {
    return this.http.get(`${this.projectListTargetUrl}?target=${target}`)
      .map(response => JSON.parse(response["_body"]).data)
  }
  getProjectDetail(id:string): Observable<Project> {
    return this.http.get(`${this.projectListUrl}?id=${id}`)
      .map(response=>JSON.parse(response["_body"])["data"][0])
  }
  getProjectDetailImgs(id:string):Observable<string[]> {
    return this.http.get(`${this.projectListImgUrl}?id=${id}`)
      .map(response => JSON.parse(response["_body"]).data)
  }

}
