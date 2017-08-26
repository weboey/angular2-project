import { Component, OnInit,Input,AfterViewInit,OnChanges}from '@angular/core';
import { SimpleChange } from '@angular/core';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/map';
import  md from 'markdown-it';
import  hljs from 'highlight.js';
import  mdContainer from 'markdown-it-container';

@Component({
  selector: 'jigsaw-markdown',
  template: `
      <div class="jigsaw-markdown" (click)="doMdContent($event)" [innerHTML]="renderContent">
      </div>
    `
})
export class JigsawMarkdownComponent implements OnInit,AfterViewInit,OnChanges {

  @Input() mdSource:string;

  renderContent:string;
  private marked:any;

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
               .use(mdContainer, 'wrap',{marker:"!"});

    this.marked.renderer.rules.image = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];
      var src = token.attrs[token.attrIndex('src')][1];
      token.attrs[token.attrIndex('src')][1] = src.replace(src.slice(0,src.lastIndexOf("/")+1),"doc/ued-design/img/");
      token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
      let imgTag = slf.renderToken(tokens, idx, options);
      return "<div class='image-container'>" + imgTag + "</div>";
    };
  }
  ngOnInit() {
    this.renderMdSource();
  }
  ngOnChanges():void {
    this.renderMdSource();
  }
  ngAfterViewInit():void {

  }
  private renderMdSource(){
    if(!!this.mdSource.match(/\.md$/) || this.mdSource.match(/^rdk\/service/)){
      this.renderContent="<div><img src='assets/img/load.gif' width='120' height='120' alt=''></div> ";
      this.http
        .get(this.mdSource)
        .map(response => response.json())
        .subscribe(mdText => {
          mdText.data = mdText.data || "<h1>没有找到这个文档！</h1>";
          this.renderContent=this.marked.render(mdText.data);
        });
    }else{
      this.renderContent=this.marked.render(this.mdSource)
    }
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

/*  let cloneImg = target.parentNode.cloneNode(true);
  cloneImg.classList.add("fixed-img");
  document.body.appendChild(cloneImg);
  cloneImg.onclick=function(){
  var evt = event || window.event;
  evt.stopPropagation();
  document.body.removeChild(cloneImg);
}*/
}

