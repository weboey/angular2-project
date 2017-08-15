import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import 'rxjs/add/operator/mergeMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import { Observable } from  'rxjs';
import  'rxjs';
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

  componentMenuNav: ComponentMenuNav;  //组件菜单

  detailNavName:string;  //"规范，demo,api"

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //console.log(this.route.parent.params);
    let menuNav$ = this.route.parent.params
      .switchMap((params: Params) => this.componentService.getComponentMenuNav(params['name']))
      .mergeMap( (componentMenuNav:ComponentMenuNav) => {
        this.componentMenuNav = componentMenuNav;
        return this.route.params
      })
      .map((params: Params) => params['navName']);
      menuNav$.subscribe((navName:string) => this.detailNavName=navName);
    //.mergeMap( (navName:string) => {
    //    this.detailNavName = navName;
    //  })

     // .subscribe((componentMenuNav: ComponentMenuNav) => this.componentMenuNav = componentMenuNav);
   // this.detailNavName="test";
   // Promise.resolve(ComponentMenuNavItems)
   // this.detailNavName = this.route.snapshot.params['navName'];

     // .switchMap()
    //  .subscribe((detailNavName: string) => this.detailNavName = detailNavName);
     // .subscribe((params: Params) => this.detailNavName=params['navName']);



    //this.route.params
    //  .mergeMap((params: Params) => {
    //    this.id = params['id'];
    //    return this.blService.getBlog(this.id);
    //  })
    //  .subscribe((blog) => {
    //    this.blog = blog;
    //  });

    const source = Observable.of('Hello');
    const source2 = Observable.of('Hello22');
   // const example = source.mergeMap(val => Observable.of(`${val} World!`));
   // const subscribe = example.subscribe(val => console.log(val)); //output: 'Hello World!'

    Observable.forkJoin(source, source2)
      .subscribe(res => {
        console.log(res);
        console.log(menuNav$)
      });
  }

}
