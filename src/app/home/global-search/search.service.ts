import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Headers, Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class SearchService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private searchResultUrl = 'rdk/service/app/ued/server/searchGlobal/searchResult';
  setMsg: EventEmitter<any>;
  constructor(
    private http: Http
  ) {
    this.setMsg = new EventEmitter()
  }
  getSearchResult(keyword: string): Observable<any> {
    return this.http.get(`${this.searchResultUrl}?keyword=${keyword}`)
      .map(response => JSON.parse(response["_body"]))
  }

}
