import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComponentDetailComponent} from "./component-detail/component-detail.component";
import {ComponentMenuNavComponent} from "./component-menu-nav/component-menu-nav.component";
import {ComponentDetailContentComponent} from "./component-detail/component-detail-content/component-detail-content.component";
import {ComponentQuickstartComponent} from "./component-quickstart/component-quickstart.component";


const ComponentRoutes: Routes = [
  {
    path: 'components',
    children:[
      {
        path: '',  component: ComponentMenuNavComponent,
        children:[
          { path: ':name', component: ComponentDetailComponent,
            children:[
              {path: ':navName',  component: ComponentDetailContentComponent},
            ]
          },
          {path: 'jigsaw/docs/quickstart', component: ComponentQuickstartComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ComponentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentRoutingModule { }
