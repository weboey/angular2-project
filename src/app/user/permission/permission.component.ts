import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Permission} from "./permission";
import * as $ from 'jquery';
import {
  ArrayCollection, JigsawConfirmAlert, JigsawWarningAlert, PopupInfo, PopupOptions, PopupPoint, PopupPositionOffset,
  PopupPositionType,
  PopupService
} from "@rdkmaster/jigsaw";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {ProjectService} from "../../projects/project-service/project.service";
import {Person} from "./person";


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
  userPermissions: { team: string, content: any[] }[];
  nameTeam: string;
  addTeams = [];
  allName = [];
  targetPop: boolean = false;
  constName: string;
  name: string;
  roles: string;
  uid: string;
  _templateRef: PopupInfo;
  _templateInfo: PopupInfo;
  option: PopupOptions;
  userFilter: string = "";
  person: Person = new Person;
  searchTerms = new Subject<string>();
  allSearchs: Observable<any>;
  selectedTeamForSelect: any;
  dropDownShow: boolean = true;
  searchShow: boolean = false;
  teamListForSelect = new ArrayCollection();
  value: string = "";
  @ViewChild("groupPosition") groupPosition: ElementRef;
  @ViewChild("personPosition") personPosition: ElementRef;
  @ViewChild("tpGroup") tpGroup: ElementRef;
  @ViewChild("popWarning") warningAlert: ElementRef;
  _documentListe: Function;

  constructor(private projectService: ProjectService,
              private sanitizer: DomSanitizer,
              private _popupService: PopupService,
              private render: Renderer2) {
  };

  delete(row) {//弹出框表格里按钮 点击删除一行
    this.addTeams.splice(row, 1);
    console.log(this.addTeams)

  }

  addSearch(data, nameTeam) {//搜索下拉列表中按钮点击添加一个条数据到表格里
    this.dropDownShow = true;
    let newData = this.addTeams.filter(val => {
      return data.name == val.username && data.uid == val.uId;
    });
    if (newData.length == 0) {
      this.addTeams.push({username: data.name, uId: data.uid, roles: data.roles});
      this.projectService.testUserID(data.uid)
        .subscribe(name => {
        });
    }
  }

  addPerson(person) {//将选到的人添加到表格中
    this.dropDownShow = true;
    this.person.username = person.name;
    this.person.uId = person.uid;
    this.person.roles = person.roles;
    this.projectService.testUserID(person.uid)
      .subscribe(name => {
      });
  }

  onClick(team, uid) {//表格按钮删除一条数据

    JigsawWarningAlert.show("确认要删除此人吗? 删除后无法恢复!", answer => {
      if(answer && answer.label=='alert.button.yes'){
        this.projectService.deleteProjectPermission(team, uid)
          .subscribe(permission => {
            this.updateData()
          });
      }
    }, [{label: 'alert.button.no'},{label: 'alert.button.yes'}],"确认要删除此人吗? 删除后无法恢复!");

  }

  deleteGroup(data) {//删除一组
    this.nameTeam = data;
    JigsawWarningAlert.show("确认要删除此组吗? 删除后无法恢复!", answer => {
      if(answer && answer.label=='alert.button.yes'){
        this.projectService.deleteProjectPermission(this.nameTeam, '')
          .subscribe(permission => {
            this.updateData()
          });
      }
    }, [{label: 'alert.button.no'},{label: 'alert.button.yes'}],"确认要删除此组吗? 删除后无法恢复!")
    // this._templateRef = this._popupService.popup(warning)
  }

  editGroup(tp, data) {
    this.targetPop = true;
    if (this._templateRef) {
      this._templateRef.dispose();
    }
    data = JSON.parse(JSON.stringify(data));
    this.nameTeam = data.team;
    this.constName = data.team;
    this.addTeams = [];
    data.content.forEach(val => {
      this.addTeams.push({username: val.username, uId: val.uId, roles: val.roles})
    })
    this._templateRef = this._popupService.popup(tp);
  }

  popupGroup(tp) {//弹出框
    this.targetPop = false;
    this.option.pos = this.groupPosition;
    if (this._templateRef) {
      this._templateRef.dispose();
    }
    this.addTeams = [];
    this.nameTeam = "";
    this._templateRef = this._popupService.popup(tp, this.option);
  }

  popupPerson(tp) {//弹出框
    let option: PopupOptions = {
      modal: true,
      posOffset: {top: -10, right: 100},
      posType: PopupPositionType.absolute,
      pos: this.personPosition
    }
    if (this._templateInfo) {
      this._templateInfo.dispose();
    }
    this._templateInfo = this._popupService.popup(tp, option);
  }

  selectChange(message: any) {//下拉选择函数
    this.nameTeam = message.label;
  }

  search(keyword: string): void {//搜索你想找的人信息
    this.dropDownShow = false;
    this.searchTerms.next(keyword);
  }

  clearValue() {
    this.search('');
  }

  saveTemplate() {//关闭弹出框,保存数据
    if (this.targetPop) {
      this.addTeams.forEach((val, index) => {
        this.addTeams[index].team = this.nameTeam;
      })
      this.projectService.editProjectPermission(this.addTeams, this.constName)
        .subscribe(name => {
          this.updateData()
        });

    } else {
      if (this.addTeams.length == 0 || !this.nameTeam) {
        alert("组名 或 组内成员不能为空");
        return;
      }
      if (this.allName.indexOf(this.nameTeam) > -1) {
        alert("组名不能重复");
        return;
      }
      this.addTeams.forEach((val, index) => {
        this.addTeams[index].team = this.nameTeam;
      })
      this.projectService.addProjectPermission(this.addTeams)
        .subscribe(name => {
          this.updateData()
        });
    }
    this._templateRef.dispose();
  }

  keepTemplate() {//添加一个人到团队里去
    this.projectService.addTeamPerson(this.person.uId, this.nameTeam)
      .subscribe(name => {
        this.updateData()
      });
    setTimeout(() => {
      this.person = new Person;
    }, 1000)
    this._templateInfo.dispose();
  }

  closeTemplate() {//关闭弹出框 清除数据
    if (this._templateInfo) {
      this._templateInfo.dispose();
    }
    if (this._templateRef) {
      this._templateRef.dispose();
    }
    setTimeout(() => {
      this.person = new Person;
    }, 1000)
  }

  closeAlert() {
    this.nameTeam = "";
  }

  updateData() {
    let scrollEle = document.getElementsByClassName("g-main")[0];
    let oTop = scrollEle.scrollTop;
    console.log(oTop);
    this.projectService.getProjectPermission()
      .subscribe(permission => {
        this.allName = [];
        permission.forEach(val => {
          this.allName.push(val.team);
        });
        this.userPermissions = permission;
        setTimeout(()=>{
          scrollEle.scrollTop = oTop;
        },0)

        this.nameTeam = "";
        this.addTeams = [];
      })
    event.stopPropagation();
  }

  deleteAlert() {
    this.projectService.deleteProjectPermission(this.nameTeam, '')
      .subscribe(permission => {
        this.updateData()
      });
    // this._templateRef.dispose();
  }

  ngOnInit() {
    this.option = {
      modal: true,
      posOffset: {top: -10, right: 100},
      posType: PopupPositionType.absolute
    };
    this.projectService.getProjectPermission()
      .subscribe(permission => {
        this.userPermissions = permission;
        let teams = [];
        permission.forEach((val) => {
          teams.push({"label": val.team});
          this.allName.push(val.team);
        })
        this.teamListForSelect = new ArrayCollection(teams)
      })
    this.allSearchs = this.searchTerms//关键字搜索获取数据
      .debounceTime(300) //300毫秒中内容没有变才进行
      .distinctUntilChanged()//内容改变才进行
      .switchMap(keyword => {
        return this.projectService.searchtAddress(keyword);
      });
    this._documentListe = this.render.listen(document, 'click', (e) => {
      if (!$('.pop-person').is(e.target) && $('.pop-person').has(e.target).length === 0 && !!this._templateInfo) {
        this._templateInfo.dispose();
      }
      if (!this.searchShow) return;
      if (!$('.search-show').is(e.target) && $('.search-show').has(e.target).length === 0) {
        this.searchShow = false;
      }
    })
  }

  ngOnDestroy(): void {
    this._documentListe && this._documentListe();
  }

}
