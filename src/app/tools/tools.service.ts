import { Injectable } from '@angular/core';


import { Tool } from './tool'

let date = new Date();

let TOOLS= [
  new Tool(11, 'Iconfont','assets/img/tools/icon-font-tool.png',100,888,'/doc/tools/iconfont.md','','张三',date,'assets/img/icon.jpg','http://10.9.233.35:52580/ux/ued-resource/tools/IconFont.zip'),
  new Tool(13, 'MENU生成器','assets/img/tools/menu-tool.png',100,888,'/doc/tools/menu.md','','张三2',date,'','http://10.9.233.35:52580/ux/ued-resource/tools/MenuConf.zip'),
  new Tool(14, 'Rest','assets/img/tools/rest-tool.png',100,888,'/doc/tools/rest.md','','张三3',date,'',''),
  new Tool(12, 'UI设计器','assets/img/tools/ui-design-tool.png',100,888,'/doc/tools/uidesign.md','','李四',date,'',''),
];

let ToolsPromise = Promise.resolve(TOOLS);

@Injectable()
export class ToolsService {

  getTools() { return ToolsPromise; }

  getTool(id: number | string) {
    return ToolsPromise
      .then(tools => tools.find(tool => tool.id === +id));
  }
}
