/**
 * Created by 6396000843 on 2017/9/5.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class SearchFilter implements PipeTransform{
  transform(items:any[], args:any):any[]{
    var searchFn = (data:any) => {
      var all = false;
      if (typeof data === 'object') {
        for (var z in data) {
          if (all = searchFn(data[z])) {
            break;
          }
        }
      } else {
        if (typeof data === 'number') {
          all = data === args;
        } else {
          all = data.toString().match(new RegExp(args, 'i'));
        }
      }
      return all;
    };

    var searchFnObj = (data:any)=>{
      let result=[];
      for (var z in data) {
        if(z in args){
          if(data[z].toString().match(new RegExp(args[z], 'i'))){
            result.push(data);
          }
        }
      }
      return result
    };
    if(!items){
      return
    }
    if(typeof args === 'object'){
      let result=[];
      items.filter((data:any)=>{
        for (var z in data) {
          if(z in args){
            if(data[z].toString().match(new RegExp(args[z], 'i'))){
              result.push(data);
            }
          }
        }
      });
      return result
    }
    return items.filter(searchFn);
  }
}
/*
.filter('fieldfilter', function(){
  return function(data, searchFields, globalSearch){
    if((!searchFields)||(searchFields.length != 1)) return data;
    var array = [];
    angular.forEach(data, function(obj){
      var fieldStr = obj[searchFields[0]];
      if(fieldStr.toString().toLowerCase().indexOf(globalSearch.toLowerCase()) != -1){
        array.push(obj);
      }
    })
    return array;
  }
})*/
