/**
 * Created by 6396000843 on 2017/8/30.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //指令
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { JigsawMarkdownComponent } from './jigsaw-markdown/jigsaw-markdown.component';
import { SanitizeHtmlPipe } from "./pipe/sanitize.pipe";
import { SearchFilter } from "./pipe/filter.pipe";
import { ShowHeadImgPipe } from "./pipe/show-headimg.pipe";
import { IncludeHtml } from "./pipe/include-html";
import { NgIncludeDirective } from './ng-include.directive';
import { MdEditorComponent } from './md-editor/md-editor.component';
import { SexPipe} from "./pipe/sex.pipe";
import { RippleDirective} from "./directive/ripple.directive";
import { BackTopComponent } from './back-top/back-top.component';
import { ScrollDirective} from "./directive/scroll-directive";
import { InputComponent } from './input/input.component';
import { SlideImgComponent} from "./slide-img/slide-img.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    JigsawMarkdownComponent,
    SanitizeHtmlPipe,
    SexPipe,
    SearchFilter,
    ShowHeadImgPipe,IncludeHtml,
    NgIncludeDirective,
    MdEditorComponent,
    RippleDirective,ScrollDirective,
    BackTopComponent,
    SlideImgComponent,
    InputComponent],
  providers: [],
  exports:[
    JigsawMarkdownComponent,
    SanitizeHtmlPipe,
    SearchFilter,
    ShowHeadImgPipe,
    IncludeHtml,
    SexPipe,
    NgIncludeDirective,
    MdEditorComponent,
    RippleDirective,
    ScrollDirective,
    BackTopComponent,
    SlideImgComponent,
    ],
})
export class UedCommonModule { }
