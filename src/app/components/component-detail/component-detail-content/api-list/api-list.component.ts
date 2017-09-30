import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { ComponentMenuNav } from "../../../model/menu-nav-model";
import { Router, ActivatedRoute, Params ,NavigationExtras} from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {ComponentMenuService} from "../../../service/component.service";
import {ApiListService} from "./service/post-list.service";
import {Api} from "../../../model/api-model";
@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {
  componentMenuNav: ComponentMenuNav;
  apiList:Api[];
  search:string;
  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private apiListService:ApiListService,
    private http:Http
  ) { }

  ngOnInit() {
    //this.apiList=["AbstractDialogComponentBase","AbstractGeneralCollection"];
    this.route.parent.params
      .subscribe((params: Params) =>{
        this.componentMenuNav = this.componentService.getComponentMenuNav(params['name']);
        this.loadData(this.componentMenuNav.name);
      });
  }

  public loadData(menuName:string){
    return this.apiListService.getApiList(menuName)
      .subscribe(
        res=>{
          this.apiList = res;
        },
        error => {console.log(error)},
        () => {}
      );
  }

  gotoApiDetail(apiName:string){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'apiItem': apiName },
      relativeTo: this.route
    };
    this.router.navigate([`../api`], navigationExtras);
  }
}
