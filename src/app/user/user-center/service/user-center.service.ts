/**
 * Created by 6396000843 on 2017/9/21.
 */
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers,RequestOptions, RequestMethod } from '@angular/http';
import { TableData } from "@rdkmaster/jigsaw";
import { Subject } from 'rxjs/Subject';

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {User} from "../../model/user-model";

@Injectable()
export class UserCenterService {

  deleteMyPostURL:string="rdk/service/app/ued/server/post/delete-post";

  myPostUrl:string='rdk/service/app/ued/server/post/my-post-list';

  updateUserInfoUrl:string="rdk/service/app/ued/server/user/update-user-info";

  constructor(
    private http:Http,
    private route: ActivatedRoute,
    private router: Router
  ){}

  deleteMyPost(serialNum:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers ,body:{data:serialNum}});
    return this.http
      .post(this.deleteMyPostURL,null, reqOptions )
      .map(resp => {
        return resp.json();
      })
  }

  myPostData$ = new Subject<any>();

  getMyPostData(uid:string):Observable<any>{
    return this.http
      .get(this.myPostUrl+`?uid=${uid}`)
      .map(resp => {
        return resp.json();
      })
  }

  updateCurrentUserInfo(currentUser:User):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers ,body:{data:currentUser}});
    return this.http
      .post(this.updateUserInfoUrl,null, reqOptions )
      .map(resp => {
        return resp.json();
      })
  }

  myMsgs = new Subject<Message[]>();
  msgs: Message[] = [];
  sendMsg(action:string){
    this.msgs = [];
    switch (action){
      case "remove":
        this.msgs.push({severity:'success', detail:'删除成功!'});break;
      case "saveUserInfo":
        this.msgs.push({severity:'success', detail:'个人信息修改成功!'});break;
    }
    this.myMsgs.next(this.msgs);
  }
  getMsg():Observable<Message[]>{
    return this.myMsgs
  }
}
