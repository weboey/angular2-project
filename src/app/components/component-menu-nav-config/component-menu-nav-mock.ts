/**
 * Created by 6396000843 on 2017/7/21.
 */

export class ComponentMenuNav {
  id: number;
  name: string;
  label: string;
  level:number;
  parentLevelId:number;
  projectId:number;
}

export const ComponentMenuNavItems: ComponentMenuNav[] = [
  {id: 1, name: 'all',label:"全部",level:1,parentLevelId:0,projectId:1},
  {id: 2, name: 'components',label:"组件",level:1,parentLevelId:0,projectId:1},
  {id: 3, name: 'quickstart',label:"新手入门",level:2,parentLevelId:1,projectId:1},
  {id: 4, name: 'layont',label:"配色布局",level:2,parentLevelId:1,projectId:1},
  {id: 5, name: 'table',label:"表格",level:2,parentLevelId:2,projectId:1},
  {id: 6, name: 'button',label:"按钮",level:2,parentLevelId:2,projectId:1},
  {id: 7, name: 'tab',label:"tab",level:2,parentLevelId:2,projectId:1},
  {id: 8, name: 'graph',label:"图形",level:2,parentLevelId:2,projectId:1},
  {id: 10, name: 'gis',label:"地图GIS",level:2,parentLevelId:2,projectId:1},
  {id: 11, name: 'axure',label:"axure部件库",level:2,parentLevelId:2,projectId:1},
  {id: 12, name: 'alert',label:"弹出框",level:2,parentLevelId:2,projectId:1},
  {id: 13, name: 'area',label:"地区",level:2,parentLevelId:2,projectId:1},
  {id: 14, name: 'time',label:"时间",level:2,parentLevelId:2,projectId:1},
  {id: 15, name: 'input',label:"输入框",level:2,parentLevelId:2,projectId:1},
  {id: 16, name: 'checkBox',label:"复选框",level:2,parentLevelId:2,projectId:1},
  {id: 17, name: 'scrollBar',label:"滚动条",level:2,parentLevelId:2,projectId:1},
  {id: 18, name: 'other1',label:"其它1",level:2,parentLevelId:2,projectId:1},
  {id: 19, name: 'other2',label:"其它2",level:2,parentLevelId:2,projectId:1},
  {id: 20, name: 'other3',label:"其它3",level:2,parentLevelId:2,projectId:1},
  {id: 21, name: 'other4',label:"其它4",level:2,parentLevelId:2,projectId:1},
];

export class ComponentContentNav {
  id: number;
  name: string;
  label: string;
}

export const ComponentContentNavItems: ComponentContentNav[] = [
  {id: 1, name: 'norm',label:"规范"},
  {id: 2, name: 'demo',label:"示例"},
  {id: 3, name: 'api',label:"API"}
];
