import { Injectable } from '@angular/core';


import { Tool } from './tool'

let date = new Date();

let TOOLS= [
  new Tool(11, 'Iconfont','assets/img/iconfont.jpg',100,888,'这是一个非常牛逼的工具.......','','张三',date,'assets/img/icon.jpg','http://10.9.233.35:10080/xplan/images/release/2017/5/17/1495001397544.zip'),
  new Tool(12, 'UI设计器','assets/img/ui.jpg',100,888,'这是一个非常牛逼的工具.......','','李四',date,'',''),
  new Tool(13, 'MENU生成器','assets/img/menu.jpg',100,888,'这是一个非常牛逼的工具.......','','张三2',date,'','http://10.9.233.35:10080/xplan/images/release/2017/5/17/1495000591647.zip'),
  new Tool(14, 'Rest','assets/img/rest.jpg',100,888,'这是一个非常牛逼的工具.......','','张三3',date,'',''),
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
