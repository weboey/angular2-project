
import { Component, OnInit,Input,Renderer2,ViewContainerRef}from '@angular/core';
import {  Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'jigsaw-markdown',
  template: `
      <div class="jigsaw-markdown" [innerHTML]="mdSource">
      </div>
    `,
  styleUrls: ['./jigsaw-markdown.component.css']
})
export class JigsawMarkdownComponent implements OnInit {

  @Input() mdSource:string;
  renderer2:Renderer2;
  marked:any;
  hljs:any;
  constructor(private http:Http,renderer2:Renderer2//,
  ) {
    this.renderer2=renderer2;
    // marked 解析器
    //this.marked=window["marked"];
    //this.marked.setOptions({
    //  renderer: new window["marked"].Renderer(),
    //  gfm: true, //启动Github样式的Markdown
    //  tables: true, //支持Github表格，必须打开gfm选项
    //  breaks: true, //支持Github换行符，必须打开gfm选项
    //  pedantic: true,  //只解析符合markdown.pl定义的，不修正markdown的错误
    //  sanitize: false, //原始输出，忽略HTML标签
    //  smartLists: true, //优化列表输出
    //  smartypants: true
    //});
    // markdown-it 解析器
    let option = {
      html:         true,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                  // This is only for full CommonMark compatibility.
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                  // useful for external highlighters.
      linkify:      true,        // Autoconvert URL-like text to links
      typographer:  true,
      quotes: '“”‘’',
      highlight: function (str, lang) {
        let hljs=window["hljs"];
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return '';
      }
    };
    this.marked=window["markdownit"](option);//["render"];
    let marked=this.marked;
    this.marked.use(window["markdownitEmoji"])
               .use(window["markdownitContainer"], 'warning')
               .use(window["markdownitContainer"], 'left')
               .use(window["markdownitContainer"], 'right');
    this.marked.use(window["markdownitContainer"],'spoiler',{
      validate: function(params) {
        debugger;
        return params.trim().match(/^spoiler[\r\n\w\W]*?$/);
      },
      render: function (tokens, idx) {
        debugger;
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
       // var m = tokens[idx].info.trim().match(/^spoiler\s+([\r\n\w\W]*?)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          let str=""+m[1];
          return '<div class="warning">' + marked.utils.escapeHtml(str) + '\n';
        } else {
          // closing tag
          return '</div>\n';
        }
      }
    });
    this.marked.use(window["markdownitForInline"], 'foo_replace', 'text', function (tokens, idx) {
      console.error(tokens[idx].content);
      tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
    });
    //this.marked.renderer.rules.emoji = function(token, idx) {
    //  return '<span class="emoji emoji_' + token[idx].markup + '"></span>';
    //};
    //this.marked.use(blockImagePlugin, {
    //  outputContainer: true,
    //  containerClassName: "image-container"
    //});
    //this.marked.use(window["markdownitContainer"],'warning',{
    //  validate: function(params) {
    //    return params.trim().match(/^warning[\r\n\w\W]*?$/);
    //  },
    //  render: function (tokens, idx, options, env, self) {
    //    debugger;
    //    // add a class to the opening tag
    //    if (tokens[idx].nesting === 1) {
    //      tokens[idx].attrPush([ 'class', "warning" ]);
    //    }
    //    return self.renderToken(tokens, idx, options, env, self);
    //  }
    //});
    //this.marked.renderer.rules.container_warning_open = function (tokens, idx, options, env, slf) {
    //  debugger;
    //
    //  if (tokens[idx].nesting === 1) {
    //    tokens[idx].attrPush([ 'class', "warning" ]);
    //  }
    //
    //  let img= slf.renderToken(tokens, idx, options, env, slf);
    //
    //  return "<div class='image-container'>" + img + "</div>";
    //};
    this.marked.renderer.rules.image = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];
      token.attrs[token.attrIndex('alt')][1] =
        slf.renderInlineAsText(token.children, options, env);
      let img = slf.renderToken(tokens, idx, options);
      return "<div class='image-container'>" + img + "</div>";
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

