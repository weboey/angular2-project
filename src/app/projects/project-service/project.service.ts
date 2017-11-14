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
import "rxjs/add/operator/toPromise";

@Injectable()
export class ProjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectListUrl = 'rdk/service/app/ued/server/latestCreatedProjectList';
  private projectDetailUrl = 'rdk/service/app/ued/server/projectDetail';
  private projectCollectUrl = 'rdk/service/app/ued/server/projectCollect';
  private projectListMaxUrl = 'rdk/service/app/ued/server/latestCreatedProjectMaxNum';
  private projectListTargetUrl = 'rdk/service/app/ued/server/latestCreatedProjectTargets';
  private projectListImgUrl = 'rdk/service/app/ued/server/latestCreatedProjectDetailImgs';
  private projectPermissionUrl = 'rdk/service/app/ued/server/projectPermission';
  private projectDeletePermissionUrl = 'rdk/service/app/ued/server/projectDeletePermission';
  private projectAddPermissionUrl = 'rdk/service/app/ued/server/projectAddPermission';
  private addPersonUrl = 'rdk/service/app/ued/server/addPerson';
  private projectEditPermissionUrl = 'rdk/service/app/ued/server/projectEditPermission';
  private projectAuthorizedUrl = 'rdk/service/app/ued/server/sys/authority/groupListByPID';
  private testUserIDUrl = 'rdk/service/app/ued/server/testUserID';
  private projectTeamListdUrl = 'rdk/service/app/ued/server/sys/authority/teamList';
  private projectUpdatePrivilegeUrl = 'rdk/service/app/ued/server/sys/authority/updatePrivilege';
  private projectIsAuthorizedUrl = 'rdk/service/app/ued/server/sys/authority/isAuthorized';
  private projectFollowedUrl = 'rdk/service/app/ued/server/projectFollowed';
  private projectGetFollowedUrl = 'rdk/service/app/ued/server/projectGetFollowed';
  private authorOfficerUrl = 'rdk/service/app/ued/server/authorOfficer';
  private prototypeZip = 'rdk/service/app/ued/server/prototypeZip';
  private imagesZip = 'rdk/service/app/ued/server/imagesZip';
  change: EventEmitter<any>;//自定义事件
  constructor(private http: Http) {
      this.change = new EventEmitter()
  }

  //获得项目列表数据
  getProjectList(uid: string,nums:number): Observable<Project[]> {
    return this.http.get(`${this.projectListUrl}?nums=${nums}&uid=${uid}`)
      .map(response => JSON.parse(response["_body"]).data)
  }

  //获得最项目总数
  getProjectListMax(uid:string): Observable<number> {
    return this.http.get(`${this.projectListMaxUrl}?uid=${uid}`)
      .map(response => JSON.parse(response["_body"]).maxnum)
  }

  //根据项目标签获得其类
  getProjectListTarget(target: string): Observable<Project[]> {
    return this.http.get(`${this.projectListTargetUrl}?target=${target}`)
      .map(response => JSON.parse(response["_body"]).data)
  }

  //根据项目ID获得其详情
  getProjectDetail(pid:string): Observable<Project> {
    pid = JSON.stringify(pid);
    return this.http.get(`${this.projectDetailUrl}?pid=${pid}`)
      .map(response=> {return JSON.parse(response["_body"])["data"][0]})
  }

  //根据工号获得其收藏的项目列表
  getProjectCollect(uid:string): Observable<Project[]> {
    uid = JSON.stringify(uid);
    return this.http.get(`${this.projectCollectUrl}?uid=${uid}`)
      .map(response=> {return JSON.parse(response["_body"]).data})
  }

  //根据项目ID 获得其图片列表
  getProjectDetailImgs(id:string):Observable<string[]> {
    return this.http.get(`${this.projectListImgUrl}?id=${id}`)
      .map(response => JSON.parse(response["_body"]).data)
  }

  //获得队名和其队内的成员
  getProjectPermission(): Observable<any> {
    return this.http.get(`${this.projectPermissionUrl}`)
      .map(response => {
          return JSON.parse(response["_body"]).data})
  }

  //删除一个队内的一个人
  deleteProjectPermission(team:string,uid:string): Observable<any> {
    return this.http.get(`${this.projectDeletePermissionUrl}?uid=${uid}&team=${team}`)
      .map(response => {
        return response})
  }

  //创建一个团队
  addProjectPermission(teams:any): Observable<any> {
    return this.http.post(this.projectAddPermissionUrl, {data: teams}, {headers: this.headers})
  }

  //编辑一个团队
  editProjectPermission(teams:any,teamName: string): Observable<any> {
    return this.http.post(this.projectEditPermissionUrl, {data: teams,teamName:teamName}, {headers: this.headers})
  }

  //详情页内的关注功能  （取消或添加)
  updateProjectFollowed(followed:any): Observable<any> {
    return this.http.post(this.projectFollowedUrl, {data: followed}, {headers: this.headers})
  }

  //获得是否被关注的值
  getProjectFollowed(uId: string,SerialNum: string): Observable<any> {
    return this.http.get(`${this.projectGetFollowedUrl}?uId=${uId}&SerialNum=${SerialNum}`)
      .map(response => {
        return JSON.parse(response["_body"]).data})
  }

  // 根据 项目的ID, 返回已经授权的分组或者个人
  getProjectAuthorises(pid:string): Observable<any> {
    return this.http.get(`${this.projectAuthorizedUrl}?pid=${pid}`)
      .map(response => {
        return JSON.parse(response["_body"]).data})
  }

  // 返回所有的分组信息
  getProjectTeamLists(pid:string): Observable<any> {
    return this.http.get(`${this.projectTeamListdUrl}?pid=${pid}`)
      .map(response => {
        return JSON.parse(response["_body"])})
  }

  //更新一个项目授权的团队和人
  updateProjectTeamLists(pid:string,teamIds:any): Observable<any> {
    teamIds = teamIds==""? -1 : teamIds;
    return this.http.put(this.projectUpdatePrivilegeUrl,{pid:pid,teamIds:teamIds},{headers:this.headers})
  }

  // 通过关键字获得其人员列表
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
        return items
        })
  }

  // 发送邮箱
  seedMail(content: any){
    return this.http.post('/xplan/mail/send',content,{headers:this.headers})
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }
  // 判断一个人员的ID, 对某个项目是否有权限
  getAuthorized(pid: any,userId: any){
    return this.http.get(`${this.projectIsAuthorizedUrl}?pid=${pid}&userId=${userId}`)
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }

  // 检查其人是不是在数据库人员列表中
  testUserID(uId: any){
    return this.http.get(`${this.testUserIDUrl}?uId=${uId}`)
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }

  // 给团队里加一个人
  addTeamPerson(uid: string,team: string){
    return this.http.get(`${this.addPersonUrl}?uid=${JSON.stringify(uid)}&team=${team}`)
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }

  // 获得其项目授权了的所有成员的ID的数组
  getAuthorOfficer(pid: any){
    pid = JSON.stringify(pid);
    return this.http.get(`${this.authorOfficerUrl}?pid=${pid}`)
      .map(response =>{
        return JSON.parse(response["_body"])
      })
  }

  getPrototypeZip(url: string,name: string){//给项目原型打包
    url = encodeURIComponent(url);
    name = encodeURIComponent(name);
    return this.http.get(`${this.prototypeZip}?url=${url}&name=${name}`)
      .map(response =>{
        return ''
      })
  }

  getImagesZip(url: string,name: string){//给项目图片打包
    url = encodeURIComponent(url);
    name = encodeURIComponent(name);
    return this.http.get(`${this.imagesZip}?url=${url}&name=${name}`)
      .map(response =>{
        return ''
      })
  }
}
