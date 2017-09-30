import { Component, OnInit ,OnChanges,Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuNav } from "../../../model/menu-nav-model"
import { ComponentMenuService} from "../../../service/component.service";
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  componentMenuNav: ComponentMenuNav;
  apiContent:string;
  apiDetailFile:string;
  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
    this.route.parent.params
      .switchMap(this.getApiContent.bind(this))
      .subscribe((html:string) => this.apiContent = html);
  }

  private getApiContent(params: Params):Observable<string>{

    this.componentMenuNav = this.componentService.getComponentMenuNav(params['name']);

    if(this.componentMenuNav.parentLabel=="其它API"){
      this.route.queryParams
        .map(params => {console.log(params["apiItem"]); return params["apiItem"]})
        .subscribe((queryParams:string) => this.apiDetailFile = queryParams);
      return this.http.get(`doc/${this.componentMenuNav.name}-frag/${this.apiDetailFile}.html`)
        .map(html => {console.log(html);return html.text()})
        .map(this.fixHtmlHrefOfB.bind(this))
        .map(this.fixHtmlRouterlink.bind(this))
        .catch(err=>{console.error("jigsaw 找不到这个文档！！");
          return Observable.create(subscriber =>{
              subscriber.next(`<h1>Sorry! Jigsaw 找不到${this.componentMenuNav.name}文档！！</h1>`);
              subscriber.complete()
            }
          )
        })
    }else{
      let apiFileName = this.transformJigsaw(this.componentMenuNav.name);
      return this.http.get(`doc/components-frag/${apiFileName}.html`)
        .map(html => {console.log(html);return html.text()})
        .map(this.fixHtmlHrefOfA.bind(this))
        .catch(err=>{console.error("jigsaw 找不到这个文档！！");
          return Observable.create(subscriber =>{
              subscriber.next(`<h1>Sorry! Jigsaw 找不到${this.componentMenuNav.name}文档！！</h1>`);
              subscriber.complete()
            }
          )
        })
    }
  }

  //修复html文档内部导航定位地址
  private fixHtmlHrefOfA(html:string):string{
    //匹配html所有a标签
    let regA =/<a[^>]+?href=[\"\']?([^\"\']+)[\"\']?[^>]*>([^<]+)<\/a>/g;
    //匹配a标签锚点定位的href属性
    let regHref =/href=[\'\"](?=([\#]([^\'\"]+)[\'\"][^>\/>]*))/g;
    return html.replace(regA,matchV => {
      return  matchV.replace(regHref,href=>{
        return href + "components/" + this.componentMenuNav.name + "/api";
      })
    });
  }

  //修复html文档内部导航定位地址
  private fixHtmlHrefOfB(html:string):string{
    //匹配html所有a标签
    let regA =/<a[^>]+?href=[\"\']?([^\"\']+)[\"\']?[^>]*>([^<]+)<\/a>/g;
    //匹配a标签锚点定位的href属性
    let regHref =/href=[\'\"](?=([\#]([^\'\"]+)[\'\"][^>\/>]*))/g;
    return html.replace(regA,matchV => {
      return  matchV.replace(regHref,href=>{
        return href + "components/" + this.componentMenuNav.name + "/api?apiItem="+this.apiDetailFile;
      })
    });
  }

  //修复html文档链接a标签的routerlink属性
  private fixHtmlRouterlink(html:string):string{
    //匹配html所有a标签
    let regA =/<a[^>]+?routerLink=[\"\']?([^\"\']+)[\"\']?[^>]*>([^<]+)<\/a>/g;
    //匹配a标签 路径指令routerlink属性值
    let regRouterLink =/routerLink=[\'\"]([^\'\"]+)[\'\"][^>\/>]*/g;
    return html.replace(regA,matchV => {
      return  matchV.replace(regRouterLink,routerLink=>{
        let apiItem = routerLink.slice(routerLink.lastIndexOf("/")+1);
        return  `href="/components/${this.componentMenuNav.name}/api?apiItem=${apiItem}`
      })
    });


  }
  private transformJigsaw(str:string):string{
    // return "Jigsaw" + str.slice(0, 1).toUpperCase() + str.slice(1);
    return "Jigsaw" + str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }
}
