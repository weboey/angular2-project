import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyword'
})
export class KeywordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
