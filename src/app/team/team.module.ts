import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamRoutingModule} from "app/team/team-routing.module";
import {TeamComponent} from "app/team/team.component";

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamComponent
  ]
})
export class TeamModule { }
