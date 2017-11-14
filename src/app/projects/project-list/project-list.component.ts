import {Component, OnInit, ViewContainerRef, Renderer2, ViewChild, OnDestroy} from '@angular/core';
import { Project } from "../project";
import { ProjectService } from "../project-service/project.service";
import { Observable } from 'rxjs/Observable';
import {DomSanitizer} from "@angular/platform-browser";
import { PopupInfo, PopupService} from "@rdkmaster/jigsaw";
import {UserLoginService} from "../../user/user-login/user-login.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy{
  projectLists: Project[];
  boo: boolean = true;
  _templateRef: PopupInfo;
  keyWorkName: string;
  viewportShow: boolean;
  projectBase: boolean = true;
  viewPortHide: boolean = true;
  _documentListe:Function;
  viewport:any = document.getElementsByClassName("viewport")[0];
  timer:any = undefined;
  @ViewChild('tperson') tpPerson: any;
  nums: number = 6;
  max:number;
  userID: any;
  constructor(
    private projectService:ProjectService,
    private sanitizer: DomSanitizer,
    private _popupService: PopupService,
    private _renderer: Renderer2,
    private _userLoginService: UserLoginService
  ) {

  };
  collect(value: boolean):Observable<boolean>{
    if(value == this.boo) return;
    this.boo = value;
    let me = this;
    if(this.boo){
      let viewport = document.getElementsByClassName("viewport")[0];
      let timer = undefined;
      let onScroll=function(){
        me.viewportShow = me.isElementInViewport(viewport,10);
        if(!me.viewportShow){
          return;
        }

        if(!!timer){
          return ;
        }
        timer = setTimeout(function(){
          clearTimeout(timer);
          timer=null;
          me.nums=me.nums + 6;
          if(me.nums<me.max+6) {
            if(me.nums>me.max){
              me.nums=me.max;
              me.projectBase = false;
            }
            me.listprojects(me.nums);
          }else{
            me.projectBase = false;
          }
        },500)
      }
      let ele = document.getElementsByClassName("g-main")[0];
      this._documentListe=this._renderer.listen(ele, 'scroll', onScroll);
      this.listprojects(this.nums);
    }else{
      this.projectService.getProjectCollect(this.userID)
        .subscribe(projects=>{
          for (let i = 0; i < projects.length; i++) {
            projects[i].PrototypeView = this.sanitizer.bypassSecurityTrustUrl(projects[i].PrototypeView)
          }
          this.projectLists = projects;
          this._documentListe&&this._documentListe();
          this.projectBase = true;
          this.viewPortHide = true;
        })
    }
  }
  closeTemplate(){
    this._templateRef.dispose();
  }
  keyWord(keyWorkName: string){
    this.keyWorkName = keyWorkName;
    this.projectService.getProjectListTarget(this.keyWorkName)
      .subscribe(projects =>{this.projectLists = projects;})
  }
  isElementInViewport(el , offset){
    const h = offset || 20,
      box = el.getBoundingClientRect(),
      top = (box.top>= 0),
      left = (box.left>= 0),
      bottom = (box.bottom<= (window.innerHeight ||document.documentElement.clientHeight)+h),
      right = (box.right <=(window.innerWidth ||document.documentElement.clientWidth)+h);

    return (top && left && bottom && right);
  }
  listprojects(nums){
    this.viewPortHide = false;
    this.projectService.getProjectList(this.userID,nums)
      .subscribe(projects => {
        for (let i = 0; i < projects.length; i++) {
          projects[i].PrototypeView = this.sanitizer.bypassSecurityTrustUrl(projects[i].PrototypeView)
        }
        this.projectLists = projects;
        this.viewPortHide = true;
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
      });
    this.userID = !!this._userLoginService.currentUserGlobal?this._userLoginService.currentUserGlobal.uid: "";
    let me = this;
    this.projectService.getProjectListMax(this.userID)
      .subscribe(max => {
        this.max=max;
    });
    let viewport = document.getElementsByClassName("viewport")[0];
    let timer = undefined;
    let onScroll=function(){
      me.viewportShow = me.isElementInViewport(viewport,10);
        if(!me.viewportShow){
          return;
        }

        if(!!timer){
          return ;
        }
        timer = setTimeout(function(){
          clearTimeout(timer);
          timer=null;
          me.nums=me.nums + 6;
          if(me.nums<me.max+6) {
            if(me.nums>me.max){
              me.nums=me.max;
              me.projectBase = false;
            }else{
              me.projectBase = false;
            }
            me.listprojects(me.nums);
          }
        },500)
    }
    let ele = document.getElementsByClassName("g-main")[0];
    this._documentListe=this._renderer.listen(ele, 'scroll', onScroll);
    this.listprojects(this.nums);
    // this._templateRef = this._popupService.popup(this.tpPerson)
  }
  ngOnDestroy(): void {
    this._documentListe&&this._documentListe();
  }
}
