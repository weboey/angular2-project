import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Api} from "../../../../model/api-model";

@Injectable()
export class ApiListService {

  constructor(public http: Http) {
  }

  public getApiList(menuName: string): Observable<Api[]> {
    return this.http
      .get(`/jigsaw/doc/${menuName}/list`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'get jigsaw api list error'));
  }
}
