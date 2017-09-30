/**
 * Created by 6396000843 on 2017/9/25.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexPipe'
})
export class SexPipe implements PipeTransform {
  transform(sex:number){
    if(sex){
      return {label:'男'}
    }
    return {label:'女'}
  }
}
