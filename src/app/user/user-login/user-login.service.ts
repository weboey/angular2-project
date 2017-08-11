/**
 * Created by 6396000843 on 2017/8/4.
 */

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response,RequestOptions, Request, RequestMethod } from '@angular/http';
import { User } from '../model/user-model';
import { rsa }  from './rsa';

@Injectable()
export class UserLoginService {
  public userLoginURL = 'xplan/common/authentication';
  public preparekeyURL = 'xplan/common/preparekey';
  public userInfo$: Subject<User> = new Subject<User>();
  publicKey:any;
  rsa = rsa.init();

  constructor(
    private http:Http,
    private route: ActivatedRoute,
    private router: Router
  ){
    // RSA
    console.log(this.rsa);
    // 获取公钥
    this.requestPublicKey()
      .subscribe(
        data => {this.publicKey =  data},
        error => {console.error("获取公钥失败",error);}
      );
  }
  //获取已登陆用户
  public get currentUser():Observable<User>{
    return this.userInfo$.asObservable();
  }
  // 请求公钥
  requestPublicKey():any{
    return this.http
      .get(this.preparekeyURL)
      .map((response: Response) => {
        return response.json();
      });
  }
  // 请求登陆
  private requestLogin(authData){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers ,body:authData});
    return this.http
      .post(this.userLoginURL,null,reqOptions)
      .distinctUntilChanged()
      .map((response: Response) => {
        return response.json();
      })
      .map(this.transformUserObj);
  }

  transformUserObj(resUserData){
    let user: User={
      token:resUserData.tokens,
      uid:resUserData.contents.uid,
      userName:resUserData.contents.name,
      roles:resUserData.contents.roleId,
      team:resUserData.contents.team,
      dept:resUserData.contents.dept,
      email:resUserData.contents.mail,
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      remeberMe:false
    };
    return user
  }

  // RSA加密
  private encrypt = (keyInfo, str) => {
     let key = new this.rsa.getKeyPair(keyInfo.exponent,"",keyInfo.modules);
     return this.rsa.encryptedString(key, str);
  };
  public login(user:User){
    // 请求数据
    let authData = {
      keyID: this.publicKey.keyId,
      password: this.encrypt(this.publicKey, user.password),
      userID: user.userName
    };
    // 请求登陆
    this.requestLogin(authData)
      .subscribe(
        (user:User)=>{
          if(user && user.token){
            //保存登陆用户
            console.log(JSON.stringify(user));
            //todo:暂时保存在localStorage,需要保存在cookie里
            localStorage.setItem("currentUser",JSON.stringify(user));
            this.userInfo$.next(Object.assign({},user));
          }
          this.router.navigate(['/home']);
        },
        this.handleError
      );
  }
  //登陆成功
  private handleLoginSucces(user){}
  //错误处理
  private handleError(err){
    console.error("login service error!!!");
  }
  public logout():void{
    localStorage.removeItem("currentUser");
    this.userInfo$.next(Object.assign({}));
  }
}
