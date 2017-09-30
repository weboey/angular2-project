/**
 * Created by 6396000843 on 2017/9/19.
 */
import { Injectable }    from '@angular/core';
import { CanActivate,CanActivateChild,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import {UserLoginService} from "../user/user-login/user-login.service";

@Injectable()
export class CanActivateGuard implements  CanActivate,CanActivateChild {



  constructor(private userLoginService:UserLoginService,private router: Router){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
    //if(url.match(/home[\/]?/g)){}
   // let currentUser = this.userLoginService.currentUserGlobal;
    console.log("登陆验证:",!!this.userLoginService.currentUserGlobal);
    if(!!this.userLoginService.currentUserGlobal) return true;
    //let url: string = state.url;
    //this.userLoginService.redirectUrl = url;
    this.router.navigate(['/home']);
    return false;
  }


  canActivateChild(childRoute:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
