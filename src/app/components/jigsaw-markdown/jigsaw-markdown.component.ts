import { Component, OnInit,Input}from '@angular/core';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/map';
import  md from 'markdown-it';
import  hljs from 'highlight.js';
import  mdContainer from 'markdown-it-container';

@Component({
  selector: 'jigsaw-markdown',
  template: `
      <div class="jigsaw-markdown" [innerHTML]="mdSource">
      </div>
    `
})
export class JigsawMarkdownComponent implements OnInit {

  @Input() mdSource:string;
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
               .use(mdContainer, 'right');

    this.marked.renderer.rules.image = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];
      token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
      let imgTag = slf.renderToken(tokens, idx, options);
      return "<div class='image-container'>" + imgTag + "</div>";
    };
  }
  ngOnInit() {
    if(!!this.mdSource.match(/\.md$/)){
      this.http
        .get(this.mdSource)
        .map(response => response["_body"])
        .subscribe((mdText:string) => {
          this.mdSource=this.marked.render(mdText);
        });
    }else{
      this.mdSource=this.marked.render(this.mdSource)
    }
  }
}

