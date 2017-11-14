import {Component, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {SearchService} from "../../home/global-search/search.service";
import {UserLoginService} from "../../user/user-login/user-login.service";
import { PLATFORM_ID ,Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {FormControl} from "@angular/forms";
import * as $ from 'jquery';

@Component({
  selector: 'app-ued-search',
  templateUrl: './ued-search.component.html',
  styleUrls: ['./ued-search.component.scss']
})
export class UedSearchComponent implements OnInit {
  searchIf: boolean = false;
  dropDown: boolean = false;
  private keyword: string;
  private titleFilter: FormControl = new FormControl();
  pathName: string;
  resultShow: any[] = [];
  tag: string = 'all';
  otherModules: any[] = [];
  _document: Function;
  userID: any;
  warning: boolean = false;
  value: string = "";

  searchShow(event) {
    event.stopPropagation();
    this.searchIf = true;
  }

  clearInput(event: Event) {
    event.stopPropagation();
    this.value = "";
  }
  constructor(public viewContainerRef: ViewContainerRef,
              public renderer: Renderer2,
              private searchService: SearchService,
              @Inject(PLATFORM_ID) private platformId : Object,
              private _userLoginService: UserLoginService
  ) {}
  msgSend(x: object): void {
    this.searchService.setMsg.emit(x);
    this.dropDown = true;
  }
  ngOnInit() {
    this._userLoginService.currentUser
      .subscribe(rep=>{
        if(!rep){
          this.userID = "";
        }else{
          this.userID = rep.uid;
        }
      })
    this.userID = !!this._userLoginService.currentUserGlobal?this._userLoginService.currentUserGlobal.uid: "";
    setTimeout(()=>{
      this.searchService.setMsg.emit({keyword: "",target:""});
    });
    if (isPlatformBrowser(this.platformId)) {
      this.titleFilter.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(value => {
          this.keyword = value;
          this.searchService.getSearchResult(this.keyword, this.userID)
            .subscribe(rep => {
              if(rep.menus.length===0&&rep.articles.length===0&&rep.projects.length==0&&this.keyword!==""){
                this.warning = true;
              }else{
                this.warning = false
              }
              this.resultShow = [];
              let arr = ["/projects", "/components", "/post"];
              let pathname = window.location.pathname;
              arr = arr.filter(val => {
                return pathname.indexOf(val) != -1
              })
              if (arr.length > 0) {
                this.pathName = arr[0];
              }
              let me = this;
              let collatData = function (rep) {//当搜索出来的目标内容为空或没有指定目标（项目，组件，博文）时的数据处理
                me.otherModules = [];
                if (rep.menus.length > 0) {
                  rep.menus.forEach((val, index) => {
                    let temp = {};
                    temp["tag"] = "组件";
                    temp["path"] = "/components";
                    temp["name"] = val.label;
                    temp["id"] = val.menuId;
                    me.resultShow.push(temp);
                  });
                  me.otherModules.push({
                    "tag": "组件",
                    "tagEn": "components",
                    "tatolNum": rep.menus.length
                  })
                }
                if (rep.projects.length > 0) {
                  rep.projects.forEach((val, index) => {
                    let temp = {};
                    temp["tag"] = "项目";
                    temp["path"] = "/projects";
                    temp["name"] = val.ProjectName;
                    temp["id"] = val.SerialNum;
                    me.resultShow.push(temp);
                  });
                  me.otherModules.push({
                    "tag": "项目",
                    "tagEn": "projects",
                    "tatolNum": rep.projects.length
                  })
                }
                if (rep.articles.length > 0) {
                  rep.articles.forEach((val, index) => {
                    let temp = {};
                    temp["tag"] = "博文";
                    temp["path"] = "/post";
                    temp["name"] = val.title;
                    temp["id"] = val.articleId;
                    me.resultShow.push(temp);
                  });
                  me.otherModules.push({
                    "tag": "博文",
                    "tagEn": "post",
                    "tatolNum": rep.articles.length
                  })
                }
              }
              switch (this.pathName) {
                case "/projects":
                  this.tag = "projects";
                  if (rep.projects.length > 0) {
                    rep.projects.forEach((val, index) => {
                      let temp = {};
                      temp["tag"] = "项目";
                      temp["path"] = "/projects";
                      temp["name"] = val.ProjectName;
                      temp["id"] = val.SerialNum;
                      this.resultShow.push(temp);
                    });
                    this.otherModules = [];
                    rep.menus.length > 0 && this.otherModules.push({
                      "tag": "组件",
                      "tagEn": "components",
                      "tatolNum": rep.menus.length
                    })
                    rep.articles.length > 0 && this.otherModules.push({
                      "tag": "博文",
                      "tagEn": "post",
                      "tatolNum": rep.articles.length
                    })
                  } else {
                    collatData(rep);
                  }
                  break;
                case "/components":
                  this.tag = "components";
                  if (rep.menus.length > 0) {
                    rep.menus.forEach((val, index) => {
                      let temp = {};
                      temp["tag"] = "组件";
                      temp["path"] = "/components";
                      temp["name"] = val.label;
                      temp["id"] = val.menuId;
                      this.resultShow.push(temp);
                    });
                    this.otherModules = [];
                    rep.projects.length > 0 && this.otherModules.push({
                      "tag": "项目",
                      "tagEn": "projects",
                      "tatolNum": rep.projects.length
                    })
                    rep.articles.length > 0 && this.otherModules.push({
                      "tag": "博文",
                      "tagEn": "projects",
                      "tatolNum": rep.articles.length
                    })
                  } else {
                    collatData(rep);
                  }
                  break;
                case "/post":
                  this.tag = "post";
                  if (rep.articles.length > 0) {
                    rep.articles.forEach((val, index) => {
                      let temp = {};
                      temp["tag"] = "博文";
                      temp["path"] = "/post";
                      temp["name"] = val.title;
                      temp["id"] = val.articleId;
                      this.resultShow.push(temp);
                    });
                    this.otherModules = [];
                    rep.projects.length > 0 && this.otherModules.push({
                      "tag": "项目",
                      "tagEn": "projects",
                      "tatolNum": rep.projects.length
                    })
                    rep.menus.length > 0 && this.otherModules.push({
                      "tag": "组件",
                      "tagEn": "components",
                      "tatolNum": rep.menus.length
                    })
                  } else {
                    collatData(rep)
                  }
                  break;
                default:
                  this.otherModules = [];
                  this.tag = "all";
                  collatData(rep);
              }
              this.dropDown = false;
            })
        })
      this._document = this.renderer.listen(document, 'click', (e) => {//点击全局搜索框外的地方，关闭搜索框
        if (!this.searchIf) return;
        if (!$('.closeInput').is(e.target) && $('.closeInput').has(e.target).length === 0) {
          this.searchIf = false;
          this.clearInput(e);
        }
      })
    }
  }
}
