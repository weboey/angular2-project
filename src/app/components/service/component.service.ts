/**
 * Created by 6396000843 on 2017/7/24.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ComponentMenuNav,ComponentMenuNavItems } from '../component-menu-nav-config/component-menu-nav-mock';

let ComponentMenuPromise = Promise.resolve(ComponentMenuNavItems);

@Injectable()
export class ComponentMenuService {

  constructor() {
  }

  getComponentMenuNav(name:string):Promise<ComponentMenuNav>{
    return ComponentMenuPromise
      .then(componentMenuItems => {debugger;return componentMenuItems.find(componentMenu => componentMenu.name === name)});
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
