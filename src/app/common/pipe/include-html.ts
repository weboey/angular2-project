/**
 * Created by 6396000843 on 2017/9/5.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includeHTML'
})
export class IncludeHtml implements PipeTransform {
  transform(htmlUrl:string){
    if(!htmlUrl) return;
    return ;
  }
}
