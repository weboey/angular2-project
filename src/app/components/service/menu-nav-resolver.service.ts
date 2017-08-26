import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { ComponentMenuNav } from "../model/menu-nav-model";
import { ComponentMenuService } from "./component.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuNavResolver implements Resolve<ComponentMenuNav[]> {
  constructor( private router: Router,private componentMenuService: ComponentMenuService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComponentMenuNav[]> {
    return this.componentMenuService.getComponentMenuNavList()
  }
}


