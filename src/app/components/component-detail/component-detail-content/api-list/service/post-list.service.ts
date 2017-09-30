import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Api} from "../../../../model/api-model";

@Injectable()
export class ApiListService {

  private apiListURL:string = 'rdk/service/app/ued/server/components/api-list';

  constructor(public http:Http) { }

  public getApiList(menuName:string):Observable<Api[]>{
    let url = this.apiListURL;
    let params = new URLSearchParams();
    if (menuName) {
      params.set('menuName',menuName);
    }
   // params.set('page',String(page));
    return this.http
      .get(url,{search:params})
      .map((res:Response) => {
        let result=res.json();
        return result.data;
      })
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
