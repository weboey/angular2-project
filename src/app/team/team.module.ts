import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamRoutingModule} from "app/team/team-routing.module";
import {TeamComponent} from "app/team/team.component";
import {UedCommonModule} from "../common/ued-common.module";

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    UedCommonModule
  ],
  declarations: [
    TeamComponent,
  ]
})
export class TeamModule { }
