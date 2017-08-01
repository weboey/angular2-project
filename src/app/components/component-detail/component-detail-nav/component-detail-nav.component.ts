import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ComponentMenuService} from "../../service/component.service";
import {ComponentMenuNav} from "../../component-menu-nav-config/component-menu-nav-mock";

@Component({
  selector: 'app-component-detail-nav',
  templateUrl: './component-detail-nav.component.html',
  styleUrls: ['./component-detail-nav.component.css']
})
export class ComponentDetailNavComponent implements OnInit {

  componentMenuNav: ComponentMenuNav;

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.componentService.getComponentMenuNav(params['name']))
      .subscribe((componentMenuNav: ComponentMenuNav) => this.componentMenuNav = componentMenuNav);
  }

  recordLastNav(navName:string){
    //this.router.navigate([navName], { relativeTo: this.route });
    this.componentService.setLastDetailNav(navName);
  }
}
