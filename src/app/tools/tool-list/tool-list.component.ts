import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Tool} from "../tool";
import {ToolsService} from "../tools.service";
import {slide} from "../animate/slide";
import { PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-tools',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss'],
  animations: [ slide ]
})
export class ToolListComponent implements OnInit {

  tools:Observable<Tool[]>;
  isBrowser:boolean=true;
  constructor(
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId : Object
  ) { }

  ngOnInit() {
    this.tools = this.route.params
      .switchMap((params: Params) => {
        return this.toolsService.getTools();
      });

    if (!isPlatformBrowser(this.platformId)) {
      this.isBrowser=false;
    }
  }

  onSelect(tool: Tool): void {
    //this.router.navigate(['/tool', tool.id]);
    this.router.navigate([tool.id], { relativeTo: this.route });
  }

  getAnimate(index){
    var a=index+1;
    return 'slideInLeft'+a;
  }
}
