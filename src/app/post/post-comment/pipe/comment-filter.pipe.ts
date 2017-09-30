import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentFilter'
})
export class CommentFilterPipe implements PipeTransform {
  transform(value: any, replyId?: string,commentId?:string): any {
    let result=[];
    if(typeof value =="undefined" || !value){
      return
    }
    if(typeof replyId=="undefined" || replyId=="null"){
      for (let item of value) {
        if(item.replyId=="null"){
          result.push(item)
        }
      }
      return result
    }
    for (let item of value) {
      if(item.replyId==commentId){
         result.push(item)
      }
    }
    return result
  }

}
