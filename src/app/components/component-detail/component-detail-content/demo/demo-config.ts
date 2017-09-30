export class  Demo {
  desc:string;
  url:string
}

export class ComponentDemo {
  id: number;
  name: string;
  label: string;
  demoUrl:Demo[];
}

export const ComponentDemoList: ComponentDemo[] = [
  {id: 1, name: 'table',label:"表格",demoUrl:[
    {desc:"How To Use", url:"live-demo/table/basic/index.html"},
    {desc:"自定义列", url: "live-demo/table/addColumn/index.html"},
    {desc:"固定表头", url:"live-demo/table/fixedHead/index.html"},
    {desc:"表格分页", url:"live-demo/table/pageable/index.html"},
    {desc:"表头排序", url:"live-demo/table/setHeaderSort/index.html"},
    {desc:"表格渲染", url:"live-demo/table/renderer/index.html"},
    {desc:"单元格样式", url:"live-demo/table/setCellClass/index.html"},
    {desc:"单元格可编辑", url:"live-demo/table/setCellEditable/index.html"},
    {desc:"隐藏列", url:"live-demo/table/setColumnVisible/index.html"}
  ]},
  {id: 2, name: 'tab',label:"页签",demoUrl:[
    {desc:"How To Use", url:"live-demo/tabs/basic/index.html"},
    {desc:"destoryTab", url: "live-demo/tabs/destoryTab/index.html"},
    {desc:"hideTab", url: "live-demo/tabs/hideTab/index.html"},
    {desc:"ngFor", url: "live-demo/tabs/ngFor/index.html"},
    {desc:"showTab", url: "live-demo/tabs/showTab/index.html"},
    {desc:"tabApi", url: "live-demo/tabs/tabApi/index.html"},
    {desc:"withInput", url: "live-demo/tabs/withInput/index.html"}
  ]},
  {id: 3, name: 'time',label:"时间",demoUrl:[
    {desc:"How To Use", url:"live-demo/time/basic/index.html"},
    {desc:"comboSelect", url: "live-demo/time/comboSelect/index.html"},
    {desc:"gr", url: "live-demo/time/gr/index.html"},
    {desc:"grItems", url: "live-demo/time/grItems/index.html"},
    {desc:"weekStart", url: "live-demo/time/weekStart/index.html"}
  ]},
  {id: 4, name: 'checkbox',label:"复选框",demoUrl:[
    {desc:"How To Use", url:"live-demo/checkbox/basic/index.html"},
    {desc:"禁止选择", url: "live-demo/checkbox/disabled/index.html"}
  ]},
  {id: 5, name: 'collapse',label:"折叠",demoUrl:[
    {desc:"How To Use", url:"live-demo/collapse/basic/index.html"},
    {desc:"ngFor", url: "live-demo/collapse/ngFor/index.html"}
  ]},
  {id: 6, name: 'button',label:"按钮",demoUrl:[
    {desc:"How To Use", url:"live-demo/button/basic/index.html"},
    {desc:"disabled", url: "live-demo/button/disabled/index.html"},
    {desc:"preset", url:"live-demo/button/preset/index.html"},
    {desc:"with-loading", url:"live-demo/button/with-loading/index.html"},
    {desc:"width_height", url:"live-demo/button/width_height/index.html"},
  ]},
  {id: 7, name: 'alert',label:"弹出框",demoUrl:[
    {desc:"How To Use", url:"live-demo/alert/in-dom/index.html"},
    {desc:"popup", url: "live-demo/alert/popup/index.html"},
    {desc:"customized", url:"live-demo/alert/customized/index.html"}
  ]},
  {id: 8, name: 'select',label:"地区",demoUrl:[
    {desc:"How To Use", url:"live-demo/select/basic/index.html"},
    {desc:"第二个示列", url: "live-demo/select/checkbox/index.html"},
    {desc:"第三个示列", url:"live-demo/select/scroll/index.html"}
  ]},
  {id: 9, name: 'graph',label:"图形",demoUrl:[
    {desc:"How To Use", url:"live-demo/graph/basic/index.html"},
    {desc:"第二个示列", url: "live-demo/graph/resize/index.html"},
    {desc:"第三个示列", url:"live-demo/graph/pie/index.html"},
    {desc:"第四个示列", url:"live-demo/graph/line-bar-graph-ajax/index.html"}
  ]},
  {id: 10, name: 'scrollbar',label:"滚动条",demoUrl:[
    {desc:"How To Use", url:"live-demo/scrollbar/basic/index.html"},
    {desc:"setOptions", url: "live-demo/scrollbar/setOptions/index.html"},
    {desc:"user-define", url:"live-demo/scrollbar/user-define/index.html"}
  ]},
  {id: 10, name: 'tag',label:"标签",demoUrl:[
    {desc:"How To Use", url:"live-demo/tag/basic/index.html"}
  ]},
  {id: 10, name: 'input',label:"输入框",demoUrl:[
    {desc:"How To Use", url:"live-demo/input/basic/index.html"},
    {desc:"clearable", url:"live-demo/input/clearable/index.html"},
    {desc:"focus", url:"live-demo/input/focus/index.html"},
    {desc:"valueChange", url:"live-demo/input/valueChange/index.html"}
  ]},
  {id: 10, name: 'radio',label:"单选框",demoUrl:[
    {desc:"How To Use", url:"live-demo/radio/basic/index.html"},
    {desc:"labelField", url:"live-demo/radio/labelField/index.html"},
    {desc:"trackItemBy", url:"live-demo/radio/trackItemBy/index.html"}
  ]},
  {id: 10, name: 'pagination',label:"分页",demoUrl:[
    {desc:"How To Use", url:"live-demo/pagination/basic/index.html"},
    {desc:"with-table-data", url:"live-demo/pagination/with-table-data/index.html"}
  ]},
  {id: 10, name: 'slider',label:"滑动条",demoUrl:[
    {desc:"How To Use", url:"live-demo/slider/basic/index.html"},
    {desc:"vertical", url:"live-demo/slider/vertical/index.html"}
  ]},
  {id: 10, name: 'comboselect',label:"下拉框",demoUrl:[
    {desc:"How To Use", url:"live-demo/combo-select/basic/index.html"},
    {desc:"autoWidth", url:"live-demo/combo-select/autoWidth/index.html"},
    {desc:"change", url:"live-demo/combo-select/change/index.html"},
    {desc:"collapse", url:"live-demo/combo-select/collapse/index.html"},
    {desc:"open", url:"live-demo/combo-select/open/index.html"}
  ]}
];


