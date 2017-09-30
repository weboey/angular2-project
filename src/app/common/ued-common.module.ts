/**
 * Created by 6396000843 on 2017/8/30.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //指令
import { JigsawMarkdownComponent } from './jigsaw-markdown/jigsaw-markdown.component';
import { SanitizeHtmlPipe } from "./pipe/sanitize.pipe";
import { SearchFilter } from "./pipe/filter.pipe";
import { ShowHeadImgPipe } from "./pipe/show-headimg.pipe";
import {IncludeHtml} from "./pipe/include-html";
import { NgIncludeDirective } from './ng-include.directive';
import { MdEditorComponent } from './md-editor/md-editor.component';
import { FormsModule }   from '@angular/forms';
import {JigsawModule} from '@rdkmaster/jigsaw';
import {SexPipe} from "./pipe/sex.pipe";
import {RippleDirective} from "./directive/ripple.directive";
@NgModule({
  imports: [
    CommonModule,FormsModule,JigsawModule
  ],
  declarations: [
    JigsawMarkdownComponent,
    SanitizeHtmlPipe,
    SexPipe,
    SearchFilter,
    ShowHeadImgPipe,IncludeHtml,
    NgIncludeDirective, MdEditorComponent,RippleDirective],
  providers: [],
  exports:[
    JigsawMarkdownComponent,
    SanitizeHtmlPipe,SearchFilter,
    ShowHeadImgPipe,
    IncludeHtml,
    SexPipe,
    NgIncludeDirective,
    MdEditorComponent,RippleDirective],
})
export class UedCommonModule { }
