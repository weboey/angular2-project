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

  public get currentUser():Observable<User>{
    return this.subject.asObservable();
  }

  // 请求公钥
  private requestPublicKey(){
    return this.http
      .get(this.preparekeyURLL)
      .map((response: Response) => {
        console.log("user object>"+user);
        return response;
      })
      .subscribe(
        data => {
          console.log("login requestPublicKey>"+data);
          return data
        },
        error => {
          console.error("获取公钥失败",error);
        }
      );
  }
  // 请求登陆
  private requestLogin(authData){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.userLoginURL,authData,options)
      .map((response: Response) => {
        //let user = response.json();
        //JSON.stringify(user)
        return response;
      })
      .catch(this.handleError);
  }
  // RSA加密
  private encrypt = (keyInfo, str) => {
    let key = new this.rsa.getKeyPair(keyInfo.exponent,"",keyInfo.modules);
    return this.rsa.encryptedString(key, str);
  };

  private handleError():void{
    console.error("login service error");
  }

  public login(user:User){
    // 获取公钥
    const publicKey = this.requestPublicKey();
    // 设置数据
    //let authData = JSON.stringify({
    //  keyID    : publicKey.keyId,
    //  userID   : uid,
    //  password : this.encrypt(publicKey, user.password)
    //});
     let authData = new URLSearchParams();
     authData.append('keyID', publicKey.keyId);
     authData.append('userID', user.userName);
     authData.append('password', this.encrypt(publicKey, user.password));
    // 请求登陆
    const authResp = this.requestLogin(authData);

  }

  public logout():void{
    localStorage.removeItem("currentUser");
    this.subject.next(Object.assign({}));
  }
}
