import { Component, OnInit } from '@angular/core';
import {animateFactory} from "../animations/animate-factory";
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations:[animateFactory(500)]
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
