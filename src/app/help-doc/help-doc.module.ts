import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpMenuNavComponent } from './help-menu-nav/help-menu-nav.component';
import { HelpContentComponent } from './help-content/help-content.component';
import {HelpDocRoutingModule} from "./help-doc-routing.module";

@NgModule({
  imports: [
    CommonModule,HelpDocRoutingModule
  ],
  declarations: [HelpMenuNavComponent, HelpContentComponent]
})
export class HelpDocModule { }
