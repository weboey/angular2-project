import { Injectable }          from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";
import {ProjectService} from "./project-service/project.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private projectService:ProjectService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      let projectID:string = route.params["id"];
      // let bean:boolean=true;
      // let currentUser: string = JSON.parse(localStorage.getItem("currentUser")).uid;
      // let creatorId: string;
      // this.projectService.getProjectDetail(projectID).subscribe(res=>{
      // });
      // if(creatorId == currentUser){
      //   return true;
      // }else{
        // this.projectService.getAuthorized(projectID,currentUser)
        //   .subscribe(rep=>{
        //     bean=!rep ? false: (rep.state ? true:false);
        //   })
      // }
      // setTimeout(()=>{
      //   if(!bean){
      //     alert("你没有此项目权限，进不去")
      //   }
      //   return bean;
      // },1000)
    return true

  }


}
