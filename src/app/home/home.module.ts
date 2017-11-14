import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/*模块 here*/
import { HomeRoutingModule } from "./home-routing.module";
import { UedCommonModule } from "../common/ued-common.module";
import { JigsawTabsModule } from "@rdkmaster/jigsaw";
import { GrowlModule } from 'primeng/primeng';
/*组件 here*/
import { TopMenuComponent } from "./top-menu/top-menu.component";
import { UedSearchComponent } from "./ued-search/ued-search.component";
import { GlobalSearchComponent } from "./global-search/global-search.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UedCommonModule,
    GrowlModule,
    JigsawTabsModule,
    HomeRoutingModule,
  ],
  declarations: [
    TopMenuComponent,
    UedSearchComponent,
    GlobalSearchComponent
  ],
  exports:[TopMenuComponent,UedSearchComponent,GlobalSearchComponent]
})
export class HomeModule { }
