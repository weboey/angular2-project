import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ComponentMenuNav} from "../../component-menu-nav-config/component-menu-nav-mock";
import {ComponentMenuService} from "../../service/component.service";
@Component({
  selector: 'app-component-detail-content',
  templateUrl: './component-detail-content.component.html',
  styleUrls: ['./component-detail-content.component.css']
})
export class ComponentDetailContentComponent implements OnInit {

  componentMenuNav: ComponentMenuNav;

  detailNavName:string;

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    debugger;
    console.log(this.route.parent.params);
    this.route.parent.params
      .switchMap((params: Params) => this.componentService.getComponentMenuNav(params['name']))
      .subscribe((componentMenuNav: ComponentMenuNav) => this.componentMenuNav = componentMenuNav);
   // this.detailNavName="test";
   // Promise.resolve(ComponentMenuNavItems)
   // this.detailNavName = this.route.snapshot.params['navName'];
    this.route.params
     // .switchMap()
    //  .subscribe((detailNavName: string) => this.detailNavName = detailNavName);
      .subscribe((params: Params) => this.detailNavName=params['navName']);

  }

}
