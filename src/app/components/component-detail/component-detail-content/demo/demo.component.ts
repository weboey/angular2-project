import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";
import {Demo} from "./demo-config";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ComponentMenuService} from "../../../service/component.service";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  static allDemoList:any[];

  demoList:Demo[]=[];
  selectedComponent:string;
  currentDemo: Demo;
  showMore:boolean = false;

  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe((params: Params) => {
        const compInfo = this.componentService.getComponentMenuNav(params['name']);
        this.selectedComponent = compInfo.name;
        this.updateDemoList();
      });
    this.loadDemoList();

    console.log(location);
  }

  updateDemoList() {
    if (!DemoComponent.allDemoList || !this.selectedComponent) {
      return;
    }
    const demoInfo = DemoComponent.allDemoList.find(info => info.name === this.selectedComponent);
    if (demoInfo && demoInfo.demos.length > 0) {
      this.demoList = demoInfo.demos;
      this.currentDemo = this.demoList.find(demo => location.hash === ('#' + demo.desc));
      this.currentDemo = this.currentDemo ? this.currentDemo : this.demoList[0];
      if (!this.currentDemo.recommended) {
        // 直接跳转到了一个非推荐的demo来了
        // 注意如果一个推荐的demo都没有，则也会走进来
        this.showMore = true;
      }
    } else {
      console.error('no demo info found, name=' + this.selectedComponent);
      this.demoList = [];
    }
  }

  loadDemoList() {
    if (!!DemoComponent.allDemoList) {
      return;
    }
    this.http.get('/jigsaw/demo-urls.json').subscribe((urls:any[]) => {
      DemoComponent.allDemoList = urls;
      this.updateDemoList();
    });
  }

  getUrl(url:string){
    console.log(url);
    return  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getHref(title:string){
    //[href]="components/table/demo#test"
    return "components/" + this.selectedComponent + "/demo#" + title;
  }
  setSelect(demoInfo){
    this.currentDemo = demoInfo;
  }
  isActive(title){
    return this.currentDemo.desc==title;
  }
}
