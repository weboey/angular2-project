import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./team.component";

const TeamRoutes: Routes = [
  {
    path: 'team',
    children:[
      {
        path: '',  component: TeamComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(TeamRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TeamRoutingModule { }
