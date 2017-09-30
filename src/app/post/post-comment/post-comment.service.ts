import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { PostComment } from '../model/comment-model';

@Injectable()
export class PostCommentService {
    public commentListURL = "rdk/service/app/ued/server/post/post-comment-list";

    public submitCommentURL = "rdk/service/app/ued/server/post/post-add-comment";

    public deleteCommentURL = "rdk/service/app/ued/server/post/delete-comment";

    constructor(public http: Http) { }

    public getCommentList(postId: number):Observable<PostComment[]>{
      let params = new URLSearchParams();
      if (postId) {
        params.set('postId',''+postId);
      }
      return this.http.get(this.commentListURL,{search:params})
          .map((res: Response) => res.json())
    }

    public submitComment(comment:PostComment):Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let reqOptions = new RequestOptions({ headers: headers ,body:{data:comment}});
      return this.http
        .post(this.submitCommentURL,null,reqOptions)
        .map((response: Response) => {
          return response.json();
        })
    }

    public deleteComment(commentId:number):Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let reqOptions = new RequestOptions({ headers: headers ,body:{data:commentId}});
      return this.http
        .post(this.deleteCommentURL,null,reqOptions)
        .map((response: Response) => {
          return response.json();
        })
    }
}
