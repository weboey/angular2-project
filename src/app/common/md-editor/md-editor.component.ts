import { Component, ElementRef, SimpleChanges,Input, Output, OnInit, OnDestroy,DoCheck,OnChanges,EventEmitter, ViewChild,ViewEncapsulation } from '@angular/core';
import * as SimpleMDE from 'simplemde';

import * as md from 'markdown-it';
import * as mdHl from 'markdown-it-highlightjs';

@Component({
  selector: 'md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MdEditorComponent implements OnInit,OnDestroy,DoCheck,OnChanges {



  private smd;
  private renderer = md();

  @ViewChild('simplemde') textarea: ElementRef;

  @Input() value:string='qqqq';

  @Output() value$ = new EventEmitter<{ [key: string]: any }>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer
      .use(mdHl);
    console.log("md edit init........");
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
  ngDoCheck():void {

  }
  flag=true;
  ngOnChanges(changes:SimpleChanges):void {
    console.log("md edit On Changes......");

    !!this.value && this.flag && this.smd.value(this.value);

  }
  //disableSave():boolean{
  //  return this.smd.value()=="" || this.title=="" || !this.selectedType
  //}
  //onSave() {
  //  this.save.emit({
  //    title: this.title,
  //    subTitle:this.smd.value().replace(/#|(\s)/g,'').slice(0,60),
  //    content: this.smd.value(),
  //    type:this.selectedType.label
  //  });
  //}
  ngOnDestroy() {
    this.smd.toTextArea();
    this.smd = null;
  }
}
