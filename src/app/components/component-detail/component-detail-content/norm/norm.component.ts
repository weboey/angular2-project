import { Component, OnInit ,OnChanges,Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ComponentMenuService} from "../../../service/component.service";
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap'; //这里导入switchMap操作符是因为我们稍后将会处理路由参数的可观察对象Observable。
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
  selector: 'app-norm',
  templateUrl: './norm.component.html',
  styleUrls: ['./norm.component.css']
})
export class NormComponent implements OnInit {

  normContent:string;

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe((params: Params) => this.componentService.getComponentMenuNav(params['name']))
  }

}
