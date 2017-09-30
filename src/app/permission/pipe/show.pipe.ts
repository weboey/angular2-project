import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'show'
})
export class ShowPipe implements PipeTransform {

  transform(value: any, key: any): boolean {
    if(key == "" && !!value){
      return false;
    }
    if(!value){
      return true;
    }
    let fang = value.filter(item => {
        for(let i in item) {
          if(Object.prototype.hasOwnProperty.call(item,i)) { //过滤
            if(item[i].indexOf(key)!=-1){
              return true;
            }
          }
        }
        return false
      })
    if(fang.length == 0 || !value){
      return true;
    }
      return false;
  }

}
