import { Component, OnInit,Input,AfterViewInit,OnChanges,ViewEncapsulation}from '@angular/core';
import { SimpleChange } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import  md from 'markdown-it';
import  hljs from 'highlight.js';
import  mdContainer from 'markdown-it-container';

@Component({
  selector: 'jigsaw-markdown',
  template: `
      <div class="jigsaw-markdown-option" *ngIf="labelTypes.length">
        <select name="" id="" [(ngModel)]="defaultLabelType" (ngModelChange)="doChangeLabelType()">
          <option [value]="option" *ngFor="let option of labelTypes">{{option}}</option>
        </select>
      </div>
      <div class="jigsaw-markdown" (click)="doMdContent($event)" [innerHTML]="renderContent | sanitizeHtml">
      </div>
    `,
  styleUrls: ['./jigsaw-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JigsawMarkdownComponent implements OnInit,OnChanges {

  @Input() mdSource:string;

  renderContent:string;
  private marked:any;
  defaultLabelType:any="R";
  labelTypes:string[]=[];


  constructor(private http:Http) {

    let option = {
      html:         true,
      breaks:       false,
      langPrefix:   'language-',
      linkify:      true,
      typographer:  true,
      quotes: '“”‘’',
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return '';
      }
    };
    this.marked=md(option);
    this.marked.use(mdContainer, 'left')
               .use(mdContainer, 'right')
               .use(mdContainer, '',{   // 文字内容也根据项目类型（-R,-O）变化
                 validate: function(params) {
                   return !!params.trim().match(/^\*.*$/);
                 },
                 render:(tokens, idx)=> {
                   var m = tokens[idx].info.trim().match(/^R\s+(.*)$/);
                   var token = tokens[idx];
                   //md.utils.escapeHtml(m[1])
                   if (token.nesting === 1) {
                     // opening tag
                     console.log(m);
                     //return '<details><summary></summary>\n';
                     if(token["info"].trim().replace(/\*/gi,"") != this.defaultLabelType) {
                       return '<span class="test md-hide">';
                     }
                     else {
                       return '<span class="test">';
                     }
                   }else{
                     return '</span>';
                   }
                 },
                 marker:"@"})
               .use(mdContainer, 'wrap',{marker:"!"});
  }
  ngOnInit() {
    this.renderMdSource();
  }

  ngOnChanges():void {
    this.renderMdSource();
  }

  doChangeLabelType(){
    this.renderMdSource();
  }

  private renderMdSource(){
    if(!this.mdSource){
      this.renderContent="";
      return
    }
    if(!!this.mdSource.match(/\.(md)|(txt)$/) || this.mdSource.match(/^rdk\/service/)){
      this.renderContent="<div><img src='assets/img/load.gif' width='120' height='120' alt=''></div> ";
      this.http
        .get(this.mdSource)
        .map(response => {
          try{ return response.json() }catch(e){return response["_body"]}
        })
        .subscribe(mdText => {
          if(typeof mdText=="object"){
            mdText.data = mdText.data || "<h1>文档内容是空的！</h1>";
            this.renderContent=this.marked.render(mdText.data);
          }else{
            this.renderContent=this.marked.render(mdText);
          }
        });
    }else{
      this.renderContent=this.marked.render(this.mdSource)
    }

    this.labelTypes=[];
    this.marked.renderer.rules.image =  (tokens, idx, options, env, slf)=>{
      var token = tokens[idx];
      if(!this.labelTypes.includes(token["content"]) && token["content"]!=""){
        this.labelTypes.push(token["content"]);
        this.defaultLabelType=this.labelTypes[0];
      }

      var src = token.attrs[token.attrIndex('src')][1];
      token.attrs[token.attrIndex('src')][1] = src.replace(src.slice(0,src.lastIndexOf("/")+1),"doc/ued-design/img/");
      token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
      let imgTag = slf.renderToken(tokens, idx, options);

      if(token["content"]!=this.defaultLabelType && token["content"].indexOf("*")!=-1){ // 图片根据项目类型（-R,-O）切换
        return "";
      }
      else if(token["content"]==this.defaultLabelType && token["content"].indexOf("*")!=-1){
        return "<div class='image-container'>" + imgTag + "<div class='img-label'>"+token["content"]+"</div></div>";
      }
      return "<div class='image-container'>" + imgTag + "</div>"
    };
  }

  isFirst : boolean = true;
  imgContainerCopy :HTMLElement;

  doMdContent($event){
    let target=$event.target;
    if(target.nodeName==="IMG"){
      if(this.isFirst){
        this.imgContainerCopy = target.parentNode.cloneNode(true);
        this.imgContainerCopy.style.opacity="0";
        this.animateStart(target);
        target.parentNode.parentNode.appendChild(this.imgContainerCopy)
      }else{
        target.parentNode.parentNode.removeChild(this.imgContainerCopy);
        this.animateOver(target);
      }
      this.isFirst=!this.isFirst;
      target.parentNode.classList.toggle("animate-img-wrap");
      target.classList.toggle("animate-img");
    }
  }

  private animateStart(ele:HTMLElement){
    let boxRect = ele.getBoundingClientRect();
    ele.style.position="fixed";
    ele.style.left=boxRect.left+"px";
    ele.style.top=boxRect.top+"px";
    ele.style.cursor="zoom-out";

    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    let centerX = (bodyWidth - boxRect.width)/2;
    let centerY = (bodyHeight - boxRect.height)/2;
    //console.log("translate(" + (-boxRect.left+centerX) + "px," + (-boxRect.top+centerY) + "px) scale(1.67)");
    ele.style.transform = "translate(" + (-boxRect.left+centerX) + "px," + (-boxRect.top+centerY) + "px) scale(1.57)";
  }

  private animateOver(ele:HTMLElement){
    ele.style.position="";
    ele.style.transform="";
    ele.style.cursor="zoom-in";
  }
}

