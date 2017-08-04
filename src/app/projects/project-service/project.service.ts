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

  constructor(private http: Http) { }

  getProjectList(): Observable<Project[]> {
    return this.http.get(this.projectListUrl)
      .map(response => { return JSON.parse(response["_body"]).data })
  }
  getProjectDetail(id:string): Observable<Project> {
    return this.http.get(this.projectListUrl)
      .map(response => {
        debugger;
        let data= JSON.parse(response["_body"])["data"]
        let imgs= JSON.parse(response["_body"])["projectImgLists"] ;
        for(let i=0;i<data.length;i++){
          if(data[i]["SerialNum"] == id){
            for(let k=0;k<imgs.length;k++){
              if(imgs[k]["SerialNum"] == id){
                data[i]["ProjectImgs"] = imgs[k]["ProjectImg"]
               break;
              }
            }
            return data[i];
          }
        }
      })
  }
}
