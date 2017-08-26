import { Component, OnInit,OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap  } from '@angular/router';
import { ComponentMenuService } from "../service/component.service";
import { ComponentMenuNav } from "../model/menu-nav-model"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
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
    this.loadMenuNav();
    //2级导航
    this.componentService.getLastDetailNav()
      .subscribe((last:string)=> this.lastRecordDetailNav=last);
    //1级导航
    this.route.firstChild && this.route.firstChild.paramMap
      .subscribe((params: ParamMap) => {
        let selectedMenu = this.componentService.getComponentMenuNav(params.get('name'));
        this.selectedMenuNavId = selectedMenu["menuId"];
      });
  }
  ngOnChanges():void {

  }

  selectedMenuNavId:number;

  loadMenuNav(){
    //resolver守卫中获取菜单:
    this.route.data
      .subscribe((data: { menuNavList: ComponentMenuNav[] }) => {
            this.ComponentMenuNavItems = data.menuNavList;
            this.componentService.menuNavList=data.menuNavList;
      });
    //this.componentService.getComponentMenuNavList()
    //  .subscribe(data=>{
    //    this.ComponentMenuNavItems = data;
    //    this.componentService.componentList=data;
    //  })
  }

  isSelected(componentMenuNav):boolean{
    return componentMenuNav.menuId === this.selectedMenuNavId;
  }

  gotoComponentDetail(componentMenuNav:ComponentMenuNav){
    this.selectedMenuNavId = componentMenuNav["menuId"];
    if(this.selectedMenuNavId==3){
      this.router.navigate(['jigsaw/docs/quickstart'], { relativeTo: this.route });
    }else{
      this.router.navigate([componentMenuNav.name,this.lastRecordDetailNav], { relativeTo: this.route });
    }
  }
}
