import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Tool} from "../tool";
import {ToolsService} from "../tools.service";

@Component({
  selector: 'app-tools-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css']
})
export class ToolDetailComponent implements OnInit {

  tool: Tool;

  constructor(
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Snapshot（快照）：当不需要Observable时的替代品
    let id = +this.route.snapshot.params['id'];

    this.toolsService.getTool(id)
      .then((tool: Tool) => this.tool = tool);
  }
}
