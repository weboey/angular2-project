import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuFilter'
})
export class MenuFilterPipe implements PipeTransform {

  transform(value: any, level?: number,parentId?:  number): any {
    let result=[];
    if(typeof parentId=="undefined"){
      //return value.map(item => {
      //  if(item.level==level){
      //    return result.push(item)
      //  }
      //});
      for (let item of value) {
        if(item.level==level){
          result.push(item)
        }
      }
      return result
    }
    for (let item of value) {
      if(item.level==level && item.parentLevelId==parentId){
         result.push(item)
      }
    }
    return result
  }

}
