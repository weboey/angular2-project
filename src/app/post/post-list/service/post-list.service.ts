import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from '../../model/post-model';

@Injectable()
export class PostlistService {
  private postListURL:string = 'rdk/service/app/ued/server/post/post-list';
  //private postListURL:string = 'rdk/service/app/ued/server/post/post-list';
  // = (uid, size) => `http://zmail.zte.com.cn/Mapi/image/head/m${size || 1}/${uid.toString().substr(-3, 3)}/u${uid}.jpg`;
  public postListSearchURL = 'mock-data/postlist-search-mock.json';

  public postDetailURL = 'rdk/service/app/ued/server/post/post-detail';

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

}
