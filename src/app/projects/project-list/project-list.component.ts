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
  viewPorthide: boolean = true;
  _documentListe:Function;
  @ViewChild('tperson') tpPerson: any;
  nums: number = 9;
  max:number;
  constructor(
    private projectService:ProjectService,
    private sanitizer: DomSanitizer,
    private _popupService: PopupService,
    private _renderer: Renderer2,
    private _userLoginService: UserLoginService
  ) {

  };

  closeTemplate(){
    this._templateRef.dispose();
  }
  keyWord(keyWorkName: string){
    this.keyWorkName = keyWorkName;
    this.projectService.getProjectListTarget(this.keyWorkName)
      .subscribe(projects =>{this.projectLists = projects;})
  }
  ngOnInit() {
    let isUser = !!this._userLoginService.currentUserGlobal;
    if(isUser){

    }
    let me = this;
    this.projectService.getProjectListMax()
      .subscribe(max => {
        this.max=max;
    })
    this.viewportShow = true;
    function isElementInViewport(el , offset){
      const h = offset || 20,
        box = el.getBoundingClientRect(),
        top = (box.top>= 0),
        left = (box.left>= 0),
        bottom = (box.bottom<= (window.innerHeight ||document.documentElement.clientHeight)+h),
        right = (box.right <=(window.innerWidth ||document.documentElement.clientWidth)+h);

      return (top && left && bottom && right);
    }
    let viewport = document.getElementsByClassName("viewport")[0];
    let timer = undefined;
    let onScroll = function(){
      me.viewportShow = isElementInViewport(viewport,10);
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
            me.viewPorthide = false;
            listprojects(me.nums);
          }
        },500)
    }
    let  listprojects=function(nums){
      me.projectService.getProjectList(nums)
        .subscribe(projects => {
          for (let i = 0; i < projects.length; i++) {
            projects[i].PrototypeView = me.sanitizer.bypassSecurityTrustUrl(projects[i].PrototypeView)
          }
          me.projectLists = projects;
          me.viewportShow = true;
        })
    }
    let ele = document.getElementsByClassName("g-main")[0]
    this._documentListe=this._renderer.listen(ele, 'scroll', onScroll)
    listprojects(this.nums);
    // this._templateRef = this._popupService.popup(this.tpPerson)
  }
  ngOnDestroy(): void {
    this._documentListe&&this._documentListe();
  }
}
