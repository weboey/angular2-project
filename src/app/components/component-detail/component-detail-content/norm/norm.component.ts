import { Component, OnInit } from '@angular/core';

import {ComponentMenuNav} from "../../../model/menu-nav-model";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentMenuService} from "../../../service/component.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-norm',
  templateUrl: './norm.component.html',
  styleUrls: ['./norm.component.css']
})
export class NormComponent implements OnInit {
  componentMenuNav:ComponentMenuNav;
  mdUrl:string;
  constructor(
    private componentService:ComponentMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe((params: Params) => {
        this.componentMenuNav = this.componentService.getComponentMenuNav(params['name']);
        this.mdUrl=this.transformNormDesign(this.componentMenuNav);
      });
  }

  private transformNormDesign(componentMenuNav:ComponentMenuNav):string{
    // return "Jigsaw" + str.slice(0, 1).toUpperCase() + str.slice(1);
    return encodeURI(`rdk/service/app/ued/server/components/norm?name=${componentMenuNav.label}[${componentMenuNav.name}][${componentMenuNav.orderByNum}]&parent=${componentMenuNav.parentLabel}${componentMenuNav.parentOrder}`);
  }
}
