/**
 * Created by 6176000041 on 2017/7/28.
 */
import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

import { Project } from "../project";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Permission} from "../../permission/permission";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ProjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectListUrl = 'rdk/service/app/ued/server/latestCreatedProjectList';
  private projectListMaxUrl = 'rdk/service/app/ued/server/latestCreatedProjectMaxNum';
  private projectListTargetUrl = 'rdk/service/app/ued/server/latestCreatedProjectTargets';
  private projectListImgUrl = 'rdk/service/app/ued/server/latestCreatedProjectDetailImgs';
  private projectPermissionUrl = 'rdk/service/app/ued/server/projectPermission';
  private projectDeletePermissionUrl = 'rdk/service/app/ued/server/projectDeletePermission';
  private projectAddPermissionUrl = 'rdk/service/app/ued/server/projectAddPermission';
  private projectAuthorizedUrl = 'rdk/service/app/ued/server/sys/authority/groupListByPID';
  private projectTeamListdUrl = 'rdk/service/app/ued/server/sys/authority/teamList';
  private projectUpdatePrivilegeUrl = 'rdk/service/app/ued/server/sys/authority/updatePrivilege';
  private projectIsAuthorizedUrl = 'rdk/service/app/ued/server/sys/authority/isAuthorized';
  private projectFollowedUrl = 'rdk/service/app/ued/server/projectFollowed';
  private projectGetFollowedUrl = 'rdk/service/app/ued/server/projectGetFollowed';
  private authorOfficerUrl = 'rdk/service/app/ued/server/authorOfficer';
  change: EventEmitter<any>;
  constructor(private http: Http) {
      this.change = new EventEmitter()
  }

  getProjectList(nums:number): Observable<Project[]> {
    return this.http.get(`${this.projectListUrl}?nums=${nums}`)
      .map(response => JSON.parse(response["_body"]).data)
  }
  getProjectListMax(): Observable<number> {
    return this.http.get(`${this.projectListMaxUrl}`)
      .map(response => JSON.parse(response["_body"]).maxnum)
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
  getProjectPermission(): Observable<any> {
    return this.http.get(`${this.projectPermissionUrl}`)
      .map(response => {
          return JSON.parse(response["_body"]).data})
  }
  deleteProjectPermission(team:string,uid:string): Observable<any> {
    return this.http.get(`${this.projectDeletePermissionUrl}?uid=${uid}&team=${team}`)
      .map(response => {
        return response})
  }
  addProjectPermission(teams:any): Observable<any> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.projectAddPermissionUrl, {data: teams}, {headers: this.headers})
  }
  updateProjectFollowed(followed:any): Observable<any> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.projectFollowedUrl, {data: followed}, {headers: this.headers})
  }
  getProjectFollowed(uId: string,SerialNum: string): Observable<any> {
    return this.http.get(`${this.projectGetFollowedUrl}?uId=${uId}&SerialNum=${SerialNum}`)
      .map(response => {
        return JSON.parse(response["_body"]).data})
  }
  getProjectAuthorises(pid:string): Observable<any> {
    return this.http.get(`${this.projectAuthorizedUrl}?pid=${pid}`)
      .map(response => {
        return JSON.parse(response["_body"]).data})
  }
  getProjectTeamLists(pid:string): Observable<any> {
    return this.http.get(`${this.projectTeamListdUrl}?pid=${pid}`)
      .map(response => {
        return JSON.parse(response["_body"])})
  }
  updateProjectTeamLists(pid:string,teamIds:any): Observable<any> {
    teamIds = teamIds==""? -1 : teamIds;
    return this.http.put(this.projectUpdatePrivilegeUrl,{pid:pid,teamIds:teamIds},{headers:this.headers})
  }
  searchtAddress(keyword:string):Observable<any> {
    return this.http.get(`http://api.zte.com.cn/api/zte-km-icenter-address/v1/rest/address/getAddressBook?keyword=${keyword}`)
      .map(response => {
        let items = [];
        if(!JSON.parse(response["_body"]).bo || !JSON.parse(response["_body"]).bo.length){
          return [];
        }
        let data= JSON.parse(response["_body"]).bo;
        data.forEach(item=>{
            let long={};
            long['uid'] = item.employeeShortId;
            long['name'] = item.name;
            long['roles'] = item.deptName;
            items.push(long);
        })
        console.log(items)
        return items
        })
  }
  seedMail(content: any){
    return this.http.post('/xplan/mail/send',content,{headers:this.headers})
      .map(response =>{
        console.log(response);
        return JSON.parse(response["_body"])
      })
  }
  getAuthorized(pid: any,userId: any){
    return this.http.get(`${this.projectIsAuthorizedUrl}?pid=${pid}&userId=${userId}`)
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }
  getAuthorOfficer(pid: any){
    let pidp = JSON.stringify(pid);
    return this.http.get(`${this.authorOfficerUrl}?pid=${pidp}`)
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }
}
