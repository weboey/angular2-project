import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuFilter'
})
export class MenuFilterPipe implements PipeTransform {

  transform(value: any, level?: number,parent?:  number): any {
    let result=[];
    if(typeof value =="undefined" || !value){
      return
    }
    if(typeof parent=="undefined"){
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
      if(item.level==level && item.parent==parent){
         result.push(item)
      }
    }
    return result
  }

}
