import { Component, OnInit,OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuNav,ComponentMenuNavItems } from '../component-menu-nav-config/component-menu-nav-mock';
import {ComponentMenuService} from "../service/component.service";

@Component({
  templateUrl: './component-menu-nav.component.html',
  styleUrls: ['./component-menu-nav.component.css']
})
export class ComponentMenuNavComponent implements OnInit,OnChanges {

  ComponentMenuNavItems:ComponentMenuNav[];
  lastRecordDetailNav : string = 'norm';
  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMenuNav();
    this.componentService.getLastDetailNav().subscribe((last:string)=>
    {this.lastRecordDetailNav=last});
    // this.lastRecordDetailNav = this.componentService.getLastDetailNav();
  }
  ngOnChanges():void {

  }
  selectedMenuNavId:number;
  getMenuNav(){
    this.ComponentMenuNavItems=ComponentMenuNavItems;
  }
  isSelected(componentMenuNav):boolean{
    console.log(componentMenuNav.id === this.selectedMenuNavId);
    return componentMenuNav.id === this.selectedMenuNavId;
  }
  gotoComponentDetail(componentMenuNav:ComponentMenuNav){
    //(click)="gotoComponent(menuNavChildItem)"
    //  .subscribe((componentMenuNav: ComponentMenuNav) => this.componentMenuNav = componentMenuNav);
    this.selectedMenuNavId = componentMenuNav.id;
    if(componentMenuNav.id===3){
      this.router.navigate(['jigsaw/docs/quickstart'], { relativeTo: this.route });
    }else{
      this.router.navigate([componentMenuNav.name,this.lastRecordDetailNav], { relativeTo: this.route });
    }
  }
}
