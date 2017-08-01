import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Tool} from "../tool";
import {ToolsService} from "../tools.service";

@Component({
  selector: 'app-tools',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.css']
})
export class ToolListComponent implements OnInit {

  tools:Observable<Tool[]>;

  constructor(
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.tools = this.route.params
      .switchMap((params: Params) => {
        return this.toolsService.getTools();
      });
  }

  onSelect(tool: Tool): void {
    //this.router.navigate(['/tool', tool.id]);
    this.router.navigate([tool.id], { relativeTo: this.route });
  }

}
