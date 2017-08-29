import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComponentDetailComponent} from "./component-detail/component-detail.component";
import {ComponentMenuNavComponent} from "./component-menu-nav/component-menu-nav.component";
import {ComponentDetailContentComponent} from "./component-detail/component-detail-content/component-detail-content.component";
import {ComponentQuickstartComponent} from "./component-quickstart/component-quickstart.component";
import {NormComponent} from "./component-detail/component-detail-content/norm/norm.component";
import {DemoComponent} from "./component-detail/component-detail-content/demo/demo.component";
import {ApiComponent} from "./component-detail/component-detail-content/api/api.component";


const ComponentRoutes: Routes = [
  {
    path: 'components',
    children:[
      {
        path: '',  component: ComponentMenuNavComponent,
        children:[
          { path: ':name', component: ComponentDetailComponent,
            children:[
              {path: 'norm',  component: NormComponent},
              {path: 'demo',  component: DemoComponent},
              {path: 'api',  component: ApiComponent}
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
