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
    <a href="javascript:;" (click)="clickHandler('修改')">授权</a>`,
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
  highlight: boolean;
  sendPrompting: string ="正在发送中";
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
  // stateShow: boolean = true;//点搜索显示内容板,没内容不显示
  _templateRef: PopupInfo;
  @ViewChild('searchInput') searchInput: JigsawInput;
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

  marking() { //是否关注此项目
    this.highlight = !this.highlight
    console.log(this.highlight);
    this.route.params
      .switchMap((params: Params) => {
        return this.projectService.updateProjectFollowed({
          'uId': '6176000041',
          'SerialNum': params['id'],
          'state': this.highlight
        })
      })
      .subscribe(res => {
      });

  }
  mailCall(tpmail) {//给开通权限的人发送邮件通知
    this._templateRef = this._popupService.popup(tpmail);
    let isUser = !!this._userLoginService.currentUserGlobal;
    let projectName = this.projectDetail.ProjectName;
    if(isUser){
      this.projectService.seedMail({
        "content":{
          "title":projectName,
          "text": "内容有修改",
          "imgs": []
        },
        "fromwho":"",
        "towho":{"resId":"","indv":this.authorArr}
        })
        .subscribe(rep=>{
            if(rep =="done"){
              this.sendPrompting= "发送成功";
            }else{
              this.sendPrompting= "发送失败"
            }
            setTimeout(()=>{
              this._templateRef.dispose();
            },1000)
        });
    }
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
            if (!value.state) {
              let addPerson = [{
                "username": value.data.name,
                "uId": value.data.uid,
                "team": "",
                "email": value.data.email,
                "roles": value.data.deptName
              }]
              this.projectService.addProjectPermission(addPerson)
                .subscribe(name => {
                });
            }
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

  permission(state) {// 确定要加权限的人或团队
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
        this.projectService.getAuthorOfficer(this.projectID)
          .subscribe(res=>{
            this.authorArr = res.data[0]
          });
        return this.projectService.getProjectDetail(params["id"]);
      })
      .subscribe(projects => {
        projects.CreatTime = projects.CreatTime.slice(0, 10);
        projects.UpdateTime = projects.UpdateTime.slice(0, 10);
        projects.PrototypeView = this.sanitizer.bypassSecurityTrustUrl(projects.PrototypeView);
        this.projectDetail = projects;
        this.projectDocsShow = !projects.RequirementDoc.length;

      });
    this.route.params
      .switchMap((params: Params) => {
        return this.projectService.getProjectDetailImgs(params["id"]);
      })
      .subscribe(projectImgs => {
        this.numImgs = projectImgs.length;
        this.projectDetailImgs = projectImgs;
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
        return this.projectService.getProjectFollowed('"6176000041"', JSON.stringify(params["id"]))
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
