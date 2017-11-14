import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Tool} from "../tool";
import {ToolsService} from "../tools.service";
import {fadeIn} from "../../animations/fade-in";

@Component({
  selector: 'app-tools-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  animations: [ fadeIn ],
  encapsulation: ViewEncapsulation.None //Angular2有三种样式封装方式，分别是None、Native、Emulated
})
export class ToolDetailComponent implements OnInit {

  tool: Tool;
  isBrowser:boolean=true;

  constructor(
    private toolsService: ToolsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId : Object
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .subscribe(params=>{
        this.toolsService.getTool(params['id'])
          .then((tool: Tool) => this.tool = tool);
      });

    if (!isPlatformBrowser(this.platformId)) {
      this.isBrowser=false;
    }
  }
}
