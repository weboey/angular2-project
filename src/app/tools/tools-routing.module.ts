import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolListComponent } from "./tool-list/tool-list.component";
import { ToolDetailComponent } from "./tool-detail/tool-detail.component";

const ToolsRoutes: Routes = [
  {
    path: 'tools',
    children:[
      { path: '',  component: ToolListComponent },
      { path: ':id', component: ToolDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ToolsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ToolsRoutingModule { }
