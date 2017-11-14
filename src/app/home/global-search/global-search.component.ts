import {Component, OnInit, ViewChild} from '@angular/core';
import {JigsawTab} from "@rdkmaster/jigsaw";
import {SearchService} from "./search.service";
import createHistory from "history/createBrowserHistory"
import {Observable} from "rxjs/Observable";
import set = Reflect.set;
import {UserLoginService} from "app/user/user-login/user-login.service";


@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  @ViewChild(JigsawTab) tabs: JigsawTab;
  target: number = 0;
  allDatas: any[] = [];
  totalDatas: any[] = [];
  targetNum: number;
  keyword: any;
  selectedIndex: number = 0;
  userID: any;

  constructor(
    private searchService: SearchService,
    private _userLoginService: UserLoginService
  ) {
  }

  public showTab(index): void {//主动切换tab页，index为tab页下标，第一个为0
    this.tabs.showTab(index);
  }

  onEnter(value) {//输入框 回车事件
    this.collating(value,this.userID);
    const history = createHistory()
    this.showTab(this.target);
    history.push('/search?keyword=' + encodeURIComponent(value));
  }

  onChange() {
    setTimeout(() => {
      this.targetNum = this.selectedIndex == 0 ? this.totalDatas.length : this.selectedIndex == 1 ? this.allDatas[0].content.length : this.selectedIndex == 2
        ? this.allDatas[1].content.length : this.allDatas[2].content.length
    })
  }

  collating(keyword,id) {//搜索后整理的数据
    this.searchService.getSearchResult(keyword,id)
      .subscribe(rep => {
        let projects = [];
        let menus = [];
        let articles = [];
        this.allDatas = [];
        this.totalDatas = [];
        rep.projects.forEach(val => {
          let temp = {};
          temp["tag"] = "项目";
          temp["id"] = val.SerialNum;
          temp["img"] = val.ProjectImg;
          temp["title"] = val.ProjectName;
          temp["details"] = val.ProjectBrief;
          temp["path"] = "/projects";
          projects.push(temp);
        });
        rep.menus.forEach(val => {
          let temp = {};
          temp["tag"] = "组件";
          temp["id"] = val.menuId;
          temp["img"] = "/assets/img/elements.png";
          temp["title"] = val.label;
          temp["details"] = "";
          temp["path"] = "/components";
          menus.push(temp);
        });
        rep.articles.forEach(val => {
          let temp = {};
          temp["tag"] = "博文";
          temp["id"] = val.articleId;
          temp["img"] = !!val.headPicture?val.headPicture:"/assets/img/article.png";
          temp["title"] = val.title;
          temp["details"] = val.subTitle;
          temp["path"] = "/post";
          articles.push(temp);
        });
        this.totalDatas = this.totalDatas.concat(projects, menus, articles);
        this.allDatas.push(
          {
            target: "项目",
            content: projects
          });
        this.allDatas.push(
          {
            target: "组件",
            content: menus
          });
        this.allDatas.push(
          {
            target: "博文",
            content: articles
          });
        setTimeout(() => {
          this.showTab(this.target);
          this.target=0;
          this.onChange();
        })
      })
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
    const history = createHistory();
    const location = history.location;
    this.searchService.setMsg.subscribe((rep) => {
      this.keyword = rep.keyword;
      if (rep.keyword == "") {
        this.keyword = decodeURIComponent(location.search).slice(9);
      } else {
        history.push('/search?keyword=' + encodeURIComponent(this.keyword));
      }
      this.target = rep.target == "projects" ? 1 : rep.target == "components" ? 2 : rep.target == "post" ? 3 : 0;
      this.collating(this.keyword,this.userID)

    });
  }
}
