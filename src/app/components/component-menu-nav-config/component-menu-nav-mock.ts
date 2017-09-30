/**
 * Created by 6396000843 on 2017/7/21.
 */
import { ComponentMenuNav } from "../model/menu-nav-model";

export const ComponentMenuNavItems: ComponentMenuNav[] = [
  
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
