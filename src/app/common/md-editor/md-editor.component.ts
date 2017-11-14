import { Component, ElementRef, SimpleChanges,Input, Output, OnInit, OnDestroy,OnChanges,EventEmitter, ViewChild,ViewEncapsulation } from '@angular/core';
//import * as SimpleMDE from 'simplemde'; 备注:此方式引入这个插件，无法通过ssr！！
import * as md from 'markdown-it';
//import * as mdHl from 'markdown-it-highlightjs'; 备注:不要引入这个插件，无法通过aot编译，坑死人！！
import { PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MdEditorComponent implements OnInit,OnDestroy,OnChanges {

  private smd;
  private renderer = md();

  @ViewChild('simplemde') textarea: ElementRef;

  @Input() value:string='';

  @Output() value$ = new EventEmitter<{ [key: string]: any }>();

  constructor(@Inject(PLATFORM_ID) private platformId : Object) {}

  ngOnInit(): void {
    //this.renderer.use(mdHl);
    if (isPlatformBrowser(this.platformId)) {
      let SimpleMDE=window["SimpleMDE"];
      let config = {
        element: this.textarea.nativeElement,
        showIcons: ["code", "table", "horizontal-rule", "strikethrough", "heading-smaller"
          , "heading-bigger", "heading-1", "heading-2", "heading-3"],
        spellChecker: false,
        previewRender: () => {
          return this.renderer.render(this.smd.value());
        },
        autoDownloadFontAwesome:false //不自动下载font-awesome样式，在index中已经加入了
      };
      config = Object.assign({}, config);
      this.smd = new SimpleMDE(config);
      this.smd.value(this.value);
      this.smd.codemirror.on("change", ()=>{
        this.flag=false;
        this.value$.emit({
          content: this.smd.value()
        });
      });
    }
  }

  flag=true;
  ngOnChanges(changes:SimpleChanges):void {
    !!this.value && this.flag && this.smd.value(this.value);
  }
  ngOnDestroy() {
    this.smd.toTextArea();
    this.smd = null;
  }
}
