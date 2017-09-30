import { Injectable } from '@angular/core';
import {Post} from "../../model/post-model";
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WritePostService {
  private _commitPostURL:string = 'rdk/service/app/ued/server/post/add-post';
  private _commitEditPostURL:string = 'rdk/service/app/ued/server/post/edit-post';
  constructor(private http:Http) { }

  public commitWritePost(post:Post):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers ,body:{data:post}});
    let url='';
    //edit
    if(post['articleId']){
      url=this._commitEditPostURL;
    }else{
      url=this._commitPostURL;
    }
    return this.http
      .post(url,null,reqOptions)
      .map((response: Response) => {
        return response.json();
      })
  }
}
