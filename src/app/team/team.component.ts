import { Component, OnInit } from '@angular/core';
import {fade} from "../animations/fade";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations:[fade],
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
