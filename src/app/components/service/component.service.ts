/**
 * Created by 6396000843 on 2017/7/24.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response,RequestOptions, Request, RequestMethod } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ComponentMenuNav } from "../model/menu-nav-model"

@Injectable()
export class ComponentMenuService {

  constructor(private http:Http) {
  }

  menuNavList:ComponentMenuNav[] = [];

  menuNavUrl:string="rdk/service/app/ued/server/components/menu-nav";

  getComponentMenuNavList():Observable<ComponentMenuNav[]>{
    return this.http
      .get(this.menuNavUrl)
      .map(res => {console.log("组件的菜单导航：", res.json());return res.json()})
  }

  getComponentMenuNav(name:string):ComponentMenuNav{
    //return Observable.create(subscriber =>{
        return this.menuNavList.find(componentMenu => componentMenu.name === name);
     //   subscriber.next(componentMenu);
      //  subscriber.complete()
     // }
   // );
  }

  lastDetailName = new Subject<string>();

  setLastDetailNav(name:string){
    this.lastDetailName.next(name);
  }

  //TODO:后续移步到用户行为服务中处理
  getLastDetailNav():Observable<string>{
    return this.lastDetailName;
  }

}
