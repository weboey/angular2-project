import { Component, OnInit } from '@angular/core';
import {ComponentDemo,ComponentDemoList} from "./demo-config";
import {Demo} from "./demo-config";
import {ComponentMenuNav} from "../../../model/menu-nav-model";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuService} from "../../../service/component.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  componentDemo:ComponentDemo;
  demoList:Demo[]=[];
  componentMenuNav:ComponentMenuNav;
  currentTitle:string;
  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe((params: Params) => {
        this.componentMenuNav = this.componentService.getComponentMenuNav(params['name']);
        this.componentDemo = ComponentDemoList.find(item => item.name == this.componentMenuNav.name);
        if(this.componentDemo && this.componentDemo["demoUrl"]){
          this.demoList=this.componentDemo["demoUrl"];
        }else{
          this.demoList=[];
        }
      })
  }
  getUrl(url:string){
    console.log(url);
    return  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getHref(title:string){
    //[href]="components/table/demo#test"
    return "components/" + this.componentMenuNav.name + "/demo#" + title;
  }
  setSelect(title){
    this.currentTitle=title;
  }
  isActive(title){
    return this.currentTitle==title;
  }
}
