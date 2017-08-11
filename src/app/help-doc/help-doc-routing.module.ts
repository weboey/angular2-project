import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpMenuNavComponent } from "./help-menu-nav/help-menu-nav.component";
import { HelpContentComponent } from "./help-content/help-content.component";

const HelpDocRoutes: Routes = [
  {
    path: 'help',
    children:[
      {
        path: '',  component: HelpMenuNavComponent,
        children:[
          { path: ':name', component: HelpContentComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(HelpDocRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HelpDocRoutingModule { }
