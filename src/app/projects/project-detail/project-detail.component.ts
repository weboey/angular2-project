import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../project-service/project.service";
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
import {Project} from "../project";
import * as $ from 'jquery';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {
  AdditionalColumnDefine, ColumnDefine, JigsawInput, PopupInfo, PopupService, TableCellRenderer,
  TableData
} from "@rdkmaster/jigsaw";
import set = Reflect.set;
import {UserLoginService} from "../../user/user-login/user-login.service";

@Component({
  template: '<span>操作</span>'
})
export class MyTableHeadOption extends TableCellRenderer {
}

@Component({
  template: `
    <a href="javascript:;" (click)="clickHandler()">授权</a>`,
  styles: [`a {
    color: #333;
    text-decoration: underline;
  }

  a:hover {
    text-decoration: underline
  }`]
})
export class MyTableCellOption extends TableCellRenderer {
  constructor(public projectService: ProjectService) {

    super();
  }

  clickHandler() {
    this.projectService.change.emit([this.tableData.data[this.row], this.row]);
  }
}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  projectDetail: Project = new Project();
  projectDetailImgs: string[] = [];
  projectDocsShow: boolean;
  searchbl: boolean = false;
  errorBox: boolean = true;
  projectID: string;
  prototypeZip: any;
  imagesZip:any;
  highlight: boolean;
  sendPrompting: string ="邮件通知";
  numImgs: number;
  targetImg: number = 0;
  _columns: ColumnDefine[] = [
    {
      target: 'id',
      visible: false
    }];
  tableData: TableData;
  authorises: any[] = [];
  searchAuthorise: any;
  stateAuthorise: boolean;
  showPermiss: any[];
  showBtn: boolean = false;
  authorArr: string[];
  emailClass: string ="fa fa-envelope-o";
  hiddenText: boolean = true;
  isReadMore: boolean = false;
  // stateShow: boolean = true;//点搜索显示内容板,没内容不显示
  _templateRef: PopupInfo;
  @ViewChild('searchInput') searchInput: JigsawInput;
  @ViewChild('intro') intro;
  additionalColumns: AdditionalColumnDefine[] = [{
    header: {
      renderer: MyTableHeadOption,
    },
    cell: {
      renderer: MyTableCellOption
    }
  }];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private _popupService: PopupService,
              private ele: ElementRef,
              private _userLoginService: UserLoginService) {

  }

  getTargetImg(target) {
    this.targetImg = target;
  }
  onEnter(a){
    console.log(a)
  }
  marking() { //是否关注此项目
    this.highlight = !this.highlight;
    let userID = this._userLoginService.currentUserGlobal.uid;
    this.route.params
      .switchMap((params: Params) => {
        return this.projectService.updateProjectFollowed({
          'uId':"" + userID,
          'SerialNum': params['id'],
          'state': this.highlight
        })
      })
      .subscribe(res => {
      });

  }
  mailText: string =  ` <div style="width: 100%; font-family: 'Microsoft Yahei' !important;">
  <div style="min-width: 400px; max-width: 600px; text-align: center; margin: 0auto -15px;">
    在E办上的设计项目: 【ADMA】入库任务监控和管理-菜单式 有更新
  <div style="width: 100%; border-top: 1px solid #eee; margin: 20px 0;"></div>
  点击链接立刻查看: <a href="http://10.9.233.35/project/20171014165300279375">直达连接</a>
    <div style="width: 100%; border-top: 1px solid #eee; margin: 20px 0;"></div>
  如果您正在NOTES中浏览此邮件, 请手动复制右侧地址到Chrome等现代浏览器打开: http://10.9.233.35/project/20171014165300279375
<div style="width: 100%; border-top: 1px solid #eee; margin: 20px 0;"></div>
    <span style="font-size: 12px; color: #838383;">
    您收到这条通知是由于您具有了项目 <strong>【ADMA】入库任务监控和管理-菜单式</strong> 的浏览权限, 且发布者更新了该项目。该邮件地址为通知专用, 请勿回复此邮件。如需获得帮助，请登录网站进行反馈。
</span>
<div style="margin-top: 20px; color: #8e8e8e; text-align: center;">
  <span style="font-size: 12px !important;">E办 | 灵点团队</span>
    </div>
    </div>
    </div>
  `;
  mailCall() {//给开通权限的人发送邮件通知
    this.sendPrompting = "正在发送中";
    this.emailClass = "fa fa-spinner fa-pulse fa-fw";
    let isUser = !!this._userLoginService.currentUserGlobal;
    let projectName = this.projectDetail.ProjectName;
    this.projectService.getAuthorOfficer(this.projectID)
      .subscribe(res=>{
        this.authorArr = res.data;
        if(isUser){
          this.projectService.seedMail({
            "content":{
              "title":"[UED] 有一个与您相关的项目更新啦 • "+projectName,
              "text": this.mailText,
              "imgs": []
            },
            "fromwho":"UED",
            "towho":{"resId":"","indv":this.authorArr}
          })
            .subscribe(rep=>{
              if(rep =="done"){
                this.sendPrompting= "发送成功";
                this.emailClass = "fa fa-check-circle-o";
              }else{
                this.sendPrompting= "发送失败";
                this.emailClass = "fa fa-times-circle-o";
              }
              setTimeout(()=>{
                this.sendPrompting = "邮件通知";
                this.emailClass = "fa fa-envelope-o"
              },1000)
            });
        }
      });
  }

  btnLeft() {
    let left = this.ele.nativeElement.getElementsByClassName("imgWidth")[0];
    let trans = left.style.transform;
    let num;
    if (trans) {
      num = Number(trans.slice(11, -3));
      if (this.projectDetailImgs.length < 6 || -parseInt(num) >= (this.projectDetailImgs.length - 5) * 208) {
        return;
      }
      left.style.transform = "translateX(" + (num - 208) + "px)";
    } else {
      if (this.projectDetailImgs.length <= 5) {
        return
      }
      left.style.transform = "translateX(-208px)";
    }


  }

  btnRight() {
    let right = this.ele.nativeElement.getElementsByClassName("imgWidth")[0];
    let trans = right.style.transform;
    let num;
    if (trans) {
      num = Number(trans.slice(11, -3));
      if (!parseInt(num)) {
        return;
      }
      right.style.transform = "translateX(" + (num + 208) + "px)";
    } else {

      return;
    }
  }

  Onclick() {//根据工号搜人有没有权限
    let reg = /^[0-9]{8}$|^[0-9]{10}$/;
    let value = JSON.stringify(this.searchInput["value"]).slice(1, -1);
    if (reg.test(value)) {
      this.projectService.getAuthorized(JSON.stringify(this.projectID), this.searchInput.value)
        .subscribe(value => {
          if (!!value) {
            this.errorBox = true;
            this.searchAuthorise = value.data;
            this.stateAuthorise = value.state;
            this.projectService.testUserID(value.data.uid)
              .subscribe(name => {
              });
          } else {
            this.errorBox = false;
          }
        })
    } else {
      this.errorBox = false;
    }
    setTimeout(() => {
      $(".authoriseContent").slideDown();
    }, 200)
  }

  addAuthorise() {// 给搜的人加权限
    this.authorises.push({
      id: this.searchAuthorise.uid,
      name: this.searchAuthorise.name,
      total: false
    });
    $(".authoriseContent").slideUp();
    this.searchInput.value = "";
  }

  tagClose(seleted, index) {//去除某个团队或个人权限
    let tagDelete = this.authorises.splice(index, 1);
    if (seleted == 2 || !tagDelete[0]["total"]) {
      return
    }
    this.tableData.data.push([tagDelete[0]["id"], tagDelete[0]["name"], tagDelete[0]["total"]]);
    this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header)
  }

  banner(num) {//选择图片
    this.targetImg = num;
  }

  viewBtn() {//查看全部有权限的内容
    this.showPermiss = JSON.parse(JSON.stringify(this.authorises));
    this.showBtn = false;
  }

  readMore() {
    console.log(111)
  }
  permission(state?:string) {// 确定要加权限的人或团队
    $(".detailPermission").slideToggle("show");
    this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header)
    let stringId = "";
    if (state == "ok") {
      this.authorises.forEach(function (item) {
        if (stringId == "") {
          stringId = item.id
        } else {
          stringId += ',' + item.id;
        }
      });
      this.route.params//更新显示权限列表
        .switchMap((params: Params) => {
          return this.projectService.updateProjectTeamLists(params["id"], stringId)
        })
        .subscribe(name => {
          this.showPermiss = JSON.parse(JSON.stringify(this.authorises));
          this.showBtn = this.showPermiss.length > 6 ? true : false;
          this.showPermiss = this.showBtn ? this.showPermiss.slice(0, 5) : this.showPermiss;
        });
    }
  }

  ngOnInit(): void {
    this.projectService.change.subscribe((value: any) => {
      this.authorises.push({name: value[0][1], id: value[0][0], total: value[0][2]});
      this.tableData.data.splice(value[1], 1);
      this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header)
    });
    this.route.params
      .switchMap((params: Params) => {
        this.projectID = params["id"];
        return this.projectService.getProjectDetail(params["id"]);
      })
      .subscribe(projects => {

        let url= projects.PrototypeView;
        let reg = /52580\/ux\/ued-resource/;
        if(reg.test(url)){// 原型自动打包zip
          let index = url.lastIndexOf("/");
          let name = projects.ProjectName.replace(/\[.+\]/,"");
          this.prototypeZip = url.slice(0,index)+"/原型-"+name+".zip";
          this.projectService.getPrototypeZip(url,projects.ProjectName)
            .subscribe(rep=>{})
        }else{
          this.prototypeZip = projects.PrototypeZip ? this.sanitizer.bypassSecurityTrustUrl(projects.PrototypeZip):""
        };

        projects.CreatTime = projects.CreatTime.slice(0, 10);
        projects.UpdateTime = projects.UpdateTime.slice(0, 10);
        projects.PrototypeView = this.sanitizer.bypassSecurityTrustUrl(projects.PrototypeView);
        this.projectDetail = projects;
        this.hiddenText = this.projectDetail.ProjectBrief.length>500 ? false : true;

        this.projectDocsShow = !projects.RequirementDoc.length;

        this.route.params
          .switchMap((params: Params) => {
            return this.projectService.getProjectDetailImgs(params["id"]);
          })
          .subscribe(projectImgs => {//图片自己打包zip

            this.numImgs = projectImgs.length;
            this.projectDetailImgs = projectImgs;

            if(this.numImgs !== 0){
              if(reg.test(projectImgs[0])){
                let url = projectImgs[0];
                let index = url.lastIndexOf("/");
                this.imagesZip = url.slice(0,index)+"/效果图-"+name+".zip";
                this.projectService.getImagesZip(projectImgs[0],projects.ProjectName)
                  .subscribe(rep=>{})
              }
            }
          });
      });

    this.route.params
      .switchMap((params: Params) => {//得到授权的团队和个人数据
        return this.projectService.getProjectAuthorises(JSON.stringify(params["id"]))
      }).subscribe(target => {
      this.showPermiss = target;
      this.showBtn = this.showPermiss.length > 6 ? true : false;
      this.showPermiss = this.showPermiss.length > 6 ? this.showPermiss.slice(0, 5) : this.showPermiss;
      this.authorises = JSON.parse(JSON.stringify(target));
    });
    this.route.params//得到没有授权的团队数据
      .switchMap((params: Params) => {
        return this.projectService.getProjectTeamLists(JSON.stringify(params["id"]));
      })
      .subscribe(teams => {
        let tableBodys = [];
        teams.table.forEach(function (item) {
          let tableBody = [];
          tableBody[0] = item.id;
          tableBody[1] = item.name;
          tableBody[2] = item.total;
          tableBodys.push(tableBody);
        });
        this.tableData = new TableData(
          tableBodys,
          ["id", "team", "tatol"],
          ["编号", "团名", "总人数"]);
      });
    this.route.params
      .switchMap((params: Params) => {
      let userID = this._userLoginService.currentUserGlobal.uid;
        return this.projectService.getProjectFollowed(""+userID, JSON.stringify(params["id"]))
      })
      .subscribe(res => {
        this.highlight = res == 1 ? true : false;
      });
    $(document).mouseup((e) => {
      if (!$(".dropBlock").is(e.target) && $(".dropBlock").has(e.target).length === 0) {
        $(".authoriseContent").slideUp();
      }
    })
  }

  ngAfterViewInit(): void {


  }
}
