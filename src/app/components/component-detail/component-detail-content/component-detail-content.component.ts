import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
import { Component, OnInit ,OnChanges,Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuNav } from "../../model/menu-nav-model"
import { ComponentMenuService} from "../../service/component.service";
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string,type?:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
@Pipe({
  name: 'sanitizeResourceUrL'
})
export class SanitizeResourceUrLPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }
  transform(v:string) {
  //  return this._sanitizer.bypassSecurityTrustResourceUrl("http://localhost:4200/"+v);
    return this._sanitizer.bypassSecurityTrustResourceUrl(v);
  }
}
@Component({
  selector: 'app-component-detail-content',
  templateUrl: './component-detail-content.component.html',
  styleUrls: ['./component-detail-content.component.css']
})
export class ComponentDetailContentComponent implements OnInit {
  componentMenuNav: ComponentMenuNav;
  contentType:string;
  componentContent:string;
  norm:boolean=false;
  mdUrl:string;
  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private http:Http
  ) {}

  ngOnInit() {
    this.route.parent.params
      .switchMap((params: Params) => {
        this.componentMenuNav = this.componentService.getComponentMenuNav(params['name']);
        return this.route.params
      })
      .subscribe((params: Params) =>this.contentType=params['navName']);

      //.subscribe((navName: string) => this.detailNavName=navName);
     // this.detailNavName = this.route.snapshot.params['navName'];
     // this.route.params.subscribe((params: Params) => this.detailNavName=params['navName']);
  }

  private getApiContent():Observable<string>{
    let componentName = this.transformJigsaw(this.componentMenuNav.name);
    return this.http.get(`/jigsaw/doc/components/${componentName}.html`)
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
      this.norm=false;
      return this.getApiContent()
    }
    else if(navName==="demo"){
      this.norm=false;
      return Observable.create(subscriber =>{
          subscriber.next('');
          subscriber.complete()
        }
      )
      //Observable.empty();
    }else if(navName==="norm"){
      this.norm=true;
      this.mdUrl=this.transformNormDesign(this.componentMenuNav);
    }
    return Observable.never();
  }


  private transformJigsaw(str:string):string{
   // return "Jigsaw" + str.slice(0, 1).toUpperCase() + str.slice(1);
    return "Jigsaw" + str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }

  private transformNormDesign(componentMenuNav:ComponentMenuNav):string{
    // return "Jigsaw" + str.slice(0, 1).toUpperCase() + str.slice(1);
    return encodeURI(`rdk/service/app/ued/server/components/norm?name=${componentMenuNav.label}[${componentMenuNav.name}]`);
  }
}
