import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import { Component, OnInit ,OnChanges,Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuNav} from "../../component-menu-nav-config/component-menu-nav-mock";
import { ComponentMenuService} from "../../service/component.service";
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}

@Component({
  selector: 'app-component-detail-content',
  templateUrl: './component-detail-content.component.html',
  styleUrls: ['./component-detail-content.component.css']
})
export class ComponentDetailContentComponent implements OnInit {
  componentMenuNav: ComponentMenuNav;
  detailNavName:string;
  componentContent:string;

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private http:Http
  ) {}

  ngOnInit() {
    this.route.parent.params
      .switchMap((params: Params) => this.componentService.getComponentMenuNav(params['name']))
      .mergeMap((componentMenuNav: ComponentMenuNav) =>{
        this.componentMenuNav = componentMenuNav;
        return this.route.params
      })
      .map((params: Params) => params['navName'])
      .mergeMap(this.quertHmlTemplateForNav.bind(this))
      .subscribe(
        (html:string) => {this.componentContent = html},
        err => console.log(err),
        ()=>console.log("completed"));

      //.subscribe((navName: string) => this.detailNavName=navName);
     // this.detailNavName = this.route.snapshot.params['navName'];
     // this.route.params.subscribe((params: Params) => this.detailNavName=params['navName']);
  }

  private getApiContent():Observable<string>{
    let componentName = this.transformJigsaw(this.componentMenuNav.name);
    return this.http.get(`doc/components-frag/${componentName}.html`)
      .map(html => html.text())
      .catch(err=>{console.error("jigsaw 找不到这个文档！！");
        return Observable.create(subscriber =>{
            subscriber.next(`<h1>jigsaw 找不到${this.componentMenuNav.name}文档！！</h1>`);
            subscriber.complete()
          }
        )
      })
  }

  private quertHmlTemplateForNav(navName: string):Observable<string>{
    if(navName==="api"){
      return this.getApiContent()
    }
    else if(navName==="demo"){
      return Observable.create(subscriber =>{
          subscriber.next(`${this.componentMenuNav.name} demo content ing...`);
          subscriber.complete()
        }
      )
    }
    else if(navName==="norm"){
      return Observable.create(subscriber =>{
          subscriber.next(`${this.componentMenuNav.name} norm content ing...`);
          subscriber.complete()
        }
      )
    }
    else
      return Observable.never()
  }
  private transformJigsaw(str:string):string{
   // return "Jigsaw" + str.slice(0, 1).toUpperCase() + str.slice(1);
    return "Jigsaw" + str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }
}
