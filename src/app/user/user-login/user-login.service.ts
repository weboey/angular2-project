/**
 * Created by 6396000843 on 2017/8/4.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response,RequestOptions, Request, RequestMethod } from '@angular/http';
import { User } from '../model/user-model';

@Injectable()
export class UserLoginService {
  public userLoginURL = 'xplan/common/authentication';
  public preparekeyURL = 'xplan/common/preparekey';
  public subject: Subject<User> = new Subject<User>();

  constructor(public http:Http){}

  login(user:User){
    localStorage.setItem("currentUser",JSON.stringify(user));
    this.subject.next(Object.assign({},user));
  }

  public get currentUser():Observable<User>{
    return this.subject.asObservable();
  }

}
