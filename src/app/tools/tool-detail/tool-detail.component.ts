import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Tool} from "../tool";
import {ToolsService} from "../tools.service";

@Component({
  selector: 'app-tools-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  encapsulation: ViewEncapsulation.None //Angular2有三种样式封装方式，分别是None、Native、Emulated
})
export class ToolDetailComponent implements OnInit {

  tool: Tool;

  constructor(
    private toolsService: ToolsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Snapshot（快照）：当不需要Observable时的替代品
    //let id = +this.activeRoute.params['id'];
    this.activeRoute.params
      .subscribe(params=>{
        this.toolsService.getTool(params['id'])
          .then((tool: Tool) => this.tool = tool);
      })

  }
}
