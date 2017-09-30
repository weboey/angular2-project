import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: any, keyword: any): any {
    if(keyword == ""){
      return value
    }
    if(!value){
      return false;
    }
    return value.filter(item => {
      for(let i in item) {
        if(Object.prototype.hasOwnProperty.call(item,i)) { //过滤
          if(item[i].indexOf(keyword)!=-1){
            return true;
          }
        }
      }
      return false
    });
  }

}
