import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuNav,ComponentMenuNavItems } from '../component-menu-nav-config/component-menu-nav-mock';
import { ComponentMenuService } from "../service/component.service";


@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {

  componentMenuNav: ComponentMenuNav;

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Snapshot（快照）：当不需要Observable时的替代品
    //使用subscribe方法来检测id的变化，并据此重新获取英雄。
    debugger;
    console.log(this.route.params);
    console.log(this.route.snapshot.params['name']);
    this.route.params
      .switchMap((params: Params) => this.componentService.getComponentMenuNav(params['name']))
      .subscribe((componentMenuNav: ComponentMenuNav) => {
        this.componentMenuNav = componentMenuNav;
        //this.router.navigate(['norm'], { relativeTo: this.route })
      });

   //.switchMap((params: Params) => this.service.getHero(+params['id']))


  }

}
