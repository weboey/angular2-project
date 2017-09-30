import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*模块 here*/
import { HomeRoutingModule } from "./home-routing.module";
import {UedCommonModule} from "../common/ued-common.module";
/*组件 here*/
import { TopMenuComponent } from "./top-menu/top-menu.component";


@NgModule({
  imports: [
    CommonModule,HomeRoutingModule,UedCommonModule
  ],
  declarations: [TopMenuComponent],
  exports:[TopMenuComponent]
})
export class HomeModule { }
