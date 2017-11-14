import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post,PostAttach } from '../../model/post-model';

@Injectable()
export class PostlistService {
  private postListURL:string = 'rdk/service/app/ued/server/post/post-list';
  private postDetailURL = 'rdk/service/app/ued/server/post/post-detail';
  private postDetailAttachURL = 'rdk/service/app/ued/server/post/post-detail-attach';

  constructor(public http:Http) { }

  public getPostList(cateType: string):Observable<Post[]>{
    let url = this.postListURL;
    let params = new URLSearchParams();
    if (cateType) {
      params.set('category',cateType);
    }
   // params.set('page',String(page));

    return this.http
      .get(url,{search:params})
      .map((res:Response) => {
        let result=res.json();
        return result;
      })
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPostDetial(serialNum:string):Observable<Post>{
    let url = this.postDetailURL;
    let params = new URLSearchParams();
    if (serialNum) {
      params.set('serialNum',serialNum);
    }
    return this.http
      .get(url,{search:params})
      .map((res:Response) => {
        let result=res.json();
        console.log(result);
        return result[0];
      })
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPostAttachList(serialNum:string):Observable<PostAttach[]>{
    let url = this.postDetailAttachURL;
    let params = new URLSearchParams();
    if (serialNum) {
      params.set('serialNum',serialNum);
    }
    return this.http
      .get(url,{search:params})
      .map((res:Response) => {
        return res.json();
      })
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
